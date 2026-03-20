export async function POST(req: Request): Promise<Response> {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "Missing GEMINI_API_KEY environment variable." }),
        { status: 500, headers: { "content-type": "application/json" } }
      );
    }

    const body = (await req.json()) as unknown;
    if (
      !body ||
      typeof body !== "object" ||
      !("subject" in body) ||
      !("elapsedMinutes" in body) ||
      !("targetMinutes" in body) ||
      !("completionRate" in body)
    ) {
      return new Response(JSON.stringify({ error: "Invalid request body." }), {
        status: 400,
        headers: { "content-type": "application/json" },
      });
    }

    const subjectRaw = (body as { subject?: unknown }).subject;
    const elapsedRaw = (body as { elapsedMinutes?: unknown }).elapsedMinutes;
    const targetRaw = (body as { targetMinutes?: unknown }).targetMinutes;
    const completionRateRaw = (body as { completionRate?: unknown }).completionRate;
    const lastChoiceRaw = (body as { lastChoice?: unknown }).lastChoice;
    const unlockedItemsRaw = (body as { unlockedItems?: unknown }).unlockedItems;

    if (typeof subjectRaw !== "string") {
      return new Response(
        JSON.stringify({ error: "Field `subject` must be a string." }),
        { status: 400, headers: { "content-type": "application/json" } }
      );
    }

    const elapsedMinutes =
      typeof elapsedRaw === "number" ? elapsedRaw : Number(elapsedRaw);
    const targetMinutes =
      typeof targetRaw === "number" ? targetRaw : Number(targetRaw);
    const completionRate =
      typeof completionRateRaw === "number" ? completionRateRaw : Number(completionRateRaw);
    const lastChoice =
      typeof lastChoiceRaw === "string" && lastChoiceRaw.trim().length > 0
        ? lastChoiceRaw.trim()
        : null;
    const unlockedItems =
      Array.isArray(unlockedItemsRaw)
        ? (unlockedItemsRaw as unknown[])
            .filter((i) => typeof i === "string")
            .slice(0, 10)
            .join(", ")
        : "";

    const elapsedM = Math.max(0, Math.floor(elapsedMinutes));
    const targetM = Math.max(0, Math.floor(targetMinutes));
    const xpToAdd = Math.max(5, elapsedM * 10);

    const lastChoiceLine = lastChoice
      ? `Geçen seansta kahraman şu kararı verdi: "${lastChoice}". Hikaye bu kararın sonucuyla devam etsin.\n\n`
      : "";

    const itemsLine = unlockedItems
      ? `Kahramanın sahip olduğu eşyalar: ${unlockedItems}. Hikayede bu eşyalardan en az birine doğal bir şekilde atıfta bulun.\n\n`
      : "";

    const completionGuidance =
      completionRate < 0.5
        ? "Yolculuk yarıda kesilmiş olsun; eksik kalan bir büyü ve tamamlanamayan bir görev görünsün. 1 paragraf yaz."
        : completionRate < 1
        ? "İlerleme kaydedilmiş ama yolculuk bitmemiş olsun; bir sonraki seansa ipucu bırak. 2 paragraf yaz."
        : "Yolculuk tamamlandı; kahraman kutlansın ve başarı hissi vurgulansın. 3 paragraf yaz.";

    const prompt = `Sen Grimoire adlı karanlık fantezi temalı bir odaklanma uygulamasının hikaye motorusun. Koyu, gotik ama motive edici atmosferik hikayeler yazarsın. Türkçe yaz. Başlık ekleme, markdown kullanma.

${lastChoiceLine}${itemsLine}Kullanıcı "${subjectRaw}" konusunda ${elapsedM} dakika odaklandı (hedef: ${targetM} dakika). Kazandığı XP: ${xpToAdd}. Karakteri bir büyücü çırak olarak konumlandır.

${completionGuidance}

SADECE aşağıdaki JSON formatında yanıt ver. Başka hiçbir şey yazma:

{"chapter":"hikaye metni buraya, paragraflar \\n\\n ile ayrılır","choice1":"birinci seçenek max 6 kelime","choice2":"ikinci seçenek max 6 kelime"}`;

    const openRouterRes = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + apiKey,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.0-flash-lite-001",
          messages: [{ role: "user", content: prompt }],
        }),
      }
    );

    const data = (await openRouterRes.json()) as unknown;
    if (!openRouterRes.ok) {
      const errMessage =
        typeof (data as { error?: { message?: string } }).error?.message === "string"
          ? (data as { error: { message: string } }).error.message
          : "Bölüm üretilemedi.";
      return new Response(JSON.stringify({ error: errMessage }), {
        status: openRouterRes.status,
        headers: { "content-type": "application/json" },
      });
    }

    const rawContent =
      (data as { choices?: Array<{ message?: { content?: unknown } }> })
        .choices?.[0]?.message?.content;

    if (typeof rawContent !== "string") {
      return new Response(JSON.stringify({ error: "Geçersiz API yanıtı." }), {
        status: 500,
        headers: { "content-type": "application/json" },
      });
    }

    let chapter = rawContent.trim();
    let choices: Array<{ id: number; text: string }> = [];

    try {
      const jsonMatch = rawContent.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]) as {
          chapter?: string;
          choice1?: string;
          choice2?: string;
        };
        chapter = parsed.chapter ?? rawContent;
        if (parsed.choice1 && parsed.choice2) {
          choices = [
            { id: 1, text: parsed.choice1 },
            { id: 2, text: parsed.choice2 },
          ];
        }
      }
    } catch {
      chapter = rawContent;
    }

    return new Response(JSON.stringify({ chapter, choices }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Unknown error while generating chapter.";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
}