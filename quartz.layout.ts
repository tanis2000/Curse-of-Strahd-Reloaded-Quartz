import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/jackyzha0/quartz",
      "Discord Community": "https://discord.gg/cRFFHYye7t",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.Explorer({
      sortFn: (a, b) => {
        const nameOrderMap: Record<string, number> = {
          "Introduzione": 100,
          "Capitolo-1---Iniziare-la-Campagna": 200,
          "Capitolo-2---Le-Terre-di-Barovia": 300,
          "Capitolo-3---Condurre-il-Gioco": 400,
          "Atto-I---Nelle-Nebbie": 500,
          "Atto-I---Nelle-Nebbie/Atto-I---Sommario": 501,
          "Atto-I---Nelle-Nebbie/Arco-A---Fuga-dalla-Casa-della-Morte": 502,
          "Atto-I---Nelle-Nebbie/Arco-B---Benvenuti-in-Barovia": 503,
          "Atto-I---Nelle-Nebbie/Arco-C---Nella-Valle": 504,
          "Atto-II---La-Citta-Ombrosa": 600,
          "Atto-II---La-Citta-Ombrosa/Atto-II---Sommario": 601,
          "Atto-II---La-Citta-Ombrosa/Arco-D---La-Festa-di-Sant'Andral": 602,
          "Atto-II---La-Citta-Ombrosa/Arco-E---La-Vistana-Scomparsa": 603,
          "Atto-II---La-Citta-Ombrosa/Arco-F---Il-Desiderio-di-Lady-Wachter": 604,
          "Atto-II---La-Citta-Ombrosa/Arco-G---I-Fratelli-Strazni": 605,
          "Atto-II---La-Citta-Ombrosa/Arco-H---L'Anima-Perduta": 606,
          "Atto-II---La-Citta-Ombrosa/Arco-I---Le-Mura-di-Krezk": 607,
          "Atto-III---La-Terra-Spezzata": 700,
          "Atto-III---La-Terra-Spezzata/Atto-III---Sommario": 701,
          "Atto-III---La-Terra-Spezzata/Arco-J---La-Gemma-Rubata": 702,
          "Atto-III---La-Terra-Spezzata/Arco-K---L'Abbazia-Caduta": 703,
          "Atto-III---La-Terra-Spezzata/Arco-L---La-Tana-dei-Lupi": 704,
          "Atto-III---La-Terra-Spezzata/Arco-M---Il-Maniero-del-Drago": 705,
          "Atto-III---La-Terra-Spezzata/Arco-N---Storie-di-Vallaki": 706,
          "Atto-III---La-Terra-Spezzata/Arco-O---Cena-con-il-Diavolo": 707,
          "Atto-III---La-Terra-Spezzata/Arco-P---Il-Colpo-a--Ravenloft": 708,
          "Atto-III---La-Terra-Spezzata/Arco-Q---Un-Faro-Splendente": 709,
          "Atto-IV---I-Segreti-degli-Antichi": 800,
          "Atto-IV---I-Segreti-degli-Antichi/Atto-IV---Sommario": 801,
          "Atto-IV---I-Segreti-degli-Antichi/Arco-R---Prove-della-Montagna": 802,
          "Appendice": 900,
          "Materiale Deprecato": 1000,
        }

        let orderA = 0
        let orderB = 0

        if (a.file && a.file.slug) {
          console.log(a.file.slug);
          orderA = nameOrderMap[a.file.slug] || 0
        } else if (a.name) {
          orderA = nameOrderMap[a.name] || 0
        }

        if (b.file && b.file.slug) {
          orderB = nameOrderMap[b.file.slug] || 0
        } else if (b.name) {
          orderB = nameOrderMap[b.name] || 0
        }

        return orderA - orderB
      },
    })),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.Explorer()),
  ],
  right: [],
}
