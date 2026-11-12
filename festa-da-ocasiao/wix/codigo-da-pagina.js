// Código da página da Festa da Ocasião (Wix, Velo).
// Cole no painel de código da página que tem o elemento Embed HTML do convite
// e também na página do telão. O elemento precisa ter o ID "html1"
// (confira e ajuste a linha marcada abaixo, se o ID for outro).
import { items } from "@wix/data";

const COLECOES = { rsvp: "FestaRSVP", fotos: "FestaFotos" };
const RESPOSTAS = ["sim", "talvez", "nao"];
const texto = (v, max) => String(v == null ? "" : v).slice(0, max);

$w.onReady(function () {
  const html = $w("#html1"); // <- ID do elemento Embed HTML

  html.onMessage(async (event) => {
    const m = event.data;
    if (!m || !m.festa) return;
    const responde = (ok, res, erro) =>
      html.postMessage({ festaResp: true, id: m.id, ok, res, erro });

    try {
      // Confirmação de presença: grava só os campos esperados.
      if (m.op === "add" && m.col === "rsvp") {
        const d = m.doc || {};
        if (!RESPOSTAS.includes(d.resposta) || !texto(d.nome, 60).trim()) {
          return responde(false, null, "invalid_argument");
        }
        await items.insert(COLECOES.rsvp, {
          nome: texto(d.nome, 60).trim(),
          resposta: d.resposta,
          ocasioes: texto(d.ocasioes, 40),
          criadoEm: Date.now()
        });
        return responde(true, {});
      }

      // Foto: só imagem JPEG já comprimida pelo convite (abaixo de 400 KB).
      if (m.op === "add" && m.col === "fotos") {
        const d = m.doc || {};
        const foto = String(d.dataUrl || "");
        if (!foto.startsWith("data:image/jpeg;base64,") || foto.length > 400000 || !texto(d.autor, 60).trim()) {
          return responde(false, null, "invalid_argument");
        }
        await items.insert(COLECOES.fotos, {
          autor: texto(d.autor, 60).trim(),
          autorKey: texto(d.autorKey, 60),
          dataUrl: foto,
          criadoEm: Date.now()
        });
        return responde(true, {});
      }

      // Quantas fotos essa pessoa já mandou (limite de 10).
      if (m.op === "conta" && m.col === "fotos") {
        const r = await items.query(COLECOES.fotos)
          .eq("autorKey", texto(m.valor, 60))
          .limit(11)
          .find();
        return responde(true, { total: r.items.length });
      }

      // Telão: as fotos mais recentes.
      if (m.op === "lista" && m.col === "fotos") {
        const r = await items.query(COLECOES.fotos)
          .descending("criadoEm")
          .limit(Math.min(Number(m.limite) || 60, 100))
          .find();
        return responde(true, {
          itens: r.items.map((i) => ({ autor: i.autor, dataUrl: i.dataUrl, criadoEm: i.criadoEm }))
        });
      }

      responde(false, null, "invalid_argument");
    } catch (e) {
      console.error("Festa da Ocasião:", e);
      responde(false, null, "unavailable");
    }
  });
});
