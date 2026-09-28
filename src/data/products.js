import imgAllEyesOnMe from '../assets/products/all-eyes-on-me.png'
import imgAsapIii from '../assets/products/asap-iii-bootleg.png'
import imgPeleTheKing from '../assets/products/pele-the-king-bootleg.png'
import imgYoungThugIi from '../assets/products/young-thug-ii-bootleg.png'
import imgCardiB from '../assets/products/cardi-b-bootleg.png'
import imgToryLanez from '../assets/products/tory-lanez-bootleg.png'
import imgAaliyah from '../assets/products/aaliyah-bootleg.png'
import imgKendrickLamar from '../assets/products/kendrick-lamar-bootleg.png'
import imgBadBunny from '../assets/products/bad-bunny-bootleg.png'
import imgYoungDolph from '../assets/products/young-dolph-bootleg.png'
import imgLilPump from '../assets/products/lil-pump-bootleg.png'
import imgGodfatherCorleone from '../assets/products/godfather-corleone-bootleg.png'
import imgBobMarley from '../assets/products/bob-marley-bootleg.png'
import imgNotoriousBigIi from '../assets/products/notorious-big-ii-bootleg.png'
import imgPaulWalkerIi from '../assets/products/paul-walker-ii-bootleg.png'
import imgTravisScottLaFlame from '../assets/products/travis-scott-la-flame.png'
import imgAliciaKeys from '../assets/products/alicia-keys.png'
import imgTravisScottIi from '../assets/products/travis-scott-ii-bootleg.png'
import imgSnoopDogg from '../assets/products/snoop-dogg-doggystyle-bootleg.png'
import imgNotoriousPopKelloggs from '../assets/products/notorious-pop-kelloggs-bootleg.png'
import imgLilWayne from '../assets/products/lil-wayne-bootleg.png'
import imgBillieEilish from '../assets/products/billie-eilish-bootleg.png'
import imgSuperAsapIv from '../assets/products/super-oversized-asap-iv-bootleg.png'

const GENERIC_DESCRIPTION =
  'Camiseta oversized WALLZ, confeccionada em algodão fio 30.1 penteado, com gola ribana e reforço ombro a ombro. ' +
  'Modelagem ampla e despojada, pensada para quem busca conforto sem abrir mão de atitude.'

const SIZES = ['P', 'M', 'G', 'GG', 'XG']

// Dados temporários de desenvolvimento: produtos e imagens extraídos da referência
// (referencia/Skull Clothing - Home.mhtml), reaproveitados por WALLZ compartilhar
// parte do catálogo. Preço/parcelamento/descrição são placeholders provisórios.
export const PRODUCTS = [
  { slug: 'all-eyes-on-me', image: imgAllEyesOnMe, title: 'Camiseta Oversized All Eyes On Me', price: 'R$ 129,90', installment: '3x de R$ 43,30 sem juros', collection: 'Bootlegs', sizes: SIZES, description: GENERIC_DESCRIPTION },
  { slug: 'asap-iii-bootleg', image: imgAsapIii, title: 'Camiseta Oversized Asap Iii Bootleg', price: 'R$ 129,90', installment: '3x de R$ 43,30 sem juros', collection: 'Bootlegs', sizes: SIZES, description: GENERIC_DESCRIPTION },
  { slug: 'pele-the-king-bootleg', image: imgPeleTheKing, title: 'Camiseta Oversized Pele The King Bootleg', price: 'R$ 129,90', installment: '3x de R$ 43,30 sem juros', collection: 'Bootlegs', sizes: SIZES, description: GENERIC_DESCRIPTION },
  { slug: 'young-thug-ii-bootleg', image: imgYoungThugIi, title: 'Camiseta Oversized Young Thug Ii Bootleg', price: 'R$ 129,90', installment: '3x de R$ 43,30 sem juros', collection: 'Bootlegs', sizes: SIZES, description: GENERIC_DESCRIPTION },
  { slug: 'cardi-b-bootleg', image: imgCardiB, title: 'Camiseta Oversized Cardi B Bootleg', price: 'R$ 129,90', installment: '3x de R$ 43,30 sem juros', collection: 'Bootlegs', sizes: SIZES, description: GENERIC_DESCRIPTION },
  { slug: 'tory-lanez-bootleg', image: imgToryLanez, title: 'Camiseta Oversized Tory Lanez Bootleg', price: 'R$ 129,90', installment: '3x de R$ 43,30 sem juros', collection: 'Bootlegs', sizes: SIZES, description: GENERIC_DESCRIPTION },
  { slug: 'aaliyah-bootleg', image: imgAaliyah, title: 'Camiseta Oversized Aaliyah Bootleg', price: 'R$ 129,90', installment: '3x de R$ 43,30 sem juros', collection: 'Bootlegs', sizes: SIZES, description: GENERIC_DESCRIPTION },
  { slug: 'kendrick-lamar-bootleg', image: imgKendrickLamar, title: 'Camiseta Oversized Kendrick Lamar Bootleg', price: 'R$ 129,90', installment: '3x de R$ 43,30 sem juros', collection: 'Bootlegs', sizes: SIZES, description: GENERIC_DESCRIPTION },
  { slug: 'bad-bunny-bootleg', image: imgBadBunny, title: 'Camiseta Oversized Bad Bunny Bootleg', price: 'R$ 129,90', installment: '3x de R$ 43,30 sem juros', collection: 'Bootlegs', sizes: SIZES, description: GENERIC_DESCRIPTION },
  { slug: 'young-dolph-bootleg', image: imgYoungDolph, title: 'Camiseta Oversized Young Dolph Bootleg', price: 'R$ 129,90', installment: '3x de R$ 43,30 sem juros', collection: 'Bootlegs', sizes: SIZES, description: GENERIC_DESCRIPTION },
  { slug: 'lil-pump-bootleg', image: imgLilPump, title: 'Camiseta Oversized Lil Pump Bootleg', price: 'R$ 129,90', installment: '3x de R$ 43,30 sem juros', collection: 'Bootlegs', sizes: SIZES, description: GENERIC_DESCRIPTION },
  { slug: 'godfather-corleone-bootleg', image: imgGodfatherCorleone, title: 'Camiseta Oversized Godfather Corleone Bootleg', price: 'R$ 129,90', installment: '3x de R$ 43,30 sem juros', collection: 'Bootlegs', sizes: SIZES, description: GENERIC_DESCRIPTION },
  { slug: 'bob-marley-bootleg', image: imgBobMarley, title: 'Camiseta Oversized Bob Marley Bootleg', price: 'R$ 129,90', installment: '3x de R$ 43,30 sem juros', collection: 'Bootlegs', sizes: SIZES, description: GENERIC_DESCRIPTION },
  { slug: 'notorious-big-ii-bootleg', image: imgNotoriousBigIi, title: 'Camiseta Oversized Notorious Big Ii Bootleg', price: 'R$ 129,90', installment: '3x de R$ 43,30 sem juros', collection: 'Bootlegs', sizes: SIZES, description: GENERIC_DESCRIPTION },
  { slug: 'paul-walker-ii-bootleg', image: imgPaulWalkerIi, title: 'Camiseta Oversized Paul Walker Ii Bootleg', price: 'R$ 129,90', installment: '3x de R$ 43,30 sem juros', collection: 'Bootlegs', sizes: SIZES, description: GENERIC_DESCRIPTION },
  { slug: 'travis-scott-la-flame', image: imgTravisScottLaFlame, title: 'Camiseta Oversized Travis Scott La Flame', price: 'R$ 129,90', installment: '3x de R$ 43,30 sem juros', collection: 'Bootlegs', sizes: SIZES, description: GENERIC_DESCRIPTION },
  { slug: 'alicia-keys', image: imgAliciaKeys, title: 'Camiseta Oversized Alicia Keys', price: 'R$ 129,90', installment: '3x de R$ 43,30 sem juros', collection: 'Bootlegs', sizes: SIZES, description: GENERIC_DESCRIPTION },
  { slug: 'travis-scott-ii-bootleg', image: imgTravisScottIi, title: 'Camiseta Oversized Travis Scott Ii Bootleg', price: 'R$ 129,90', installment: '3x de R$ 43,30 sem juros', collection: 'Bootlegs', sizes: SIZES, description: GENERIC_DESCRIPTION },
  { slug: 'snoop-dogg-doggystyle-bootleg', image: imgSnoopDogg, title: 'Camiseta Oversized Snoop Dogg Doggystyle Bootleg', price: 'R$ 129,90', installment: '3x de R$ 43,30 sem juros', collection: 'Bootlegs', sizes: SIZES, description: GENERIC_DESCRIPTION },
  { slug: 'notorious-pop-kelloggs-bootleg', image: imgNotoriousPopKelloggs, title: 'Camiseta Oversized Notorious Pop Kelloggs Bootleg', price: 'R$ 129,90', installment: '3x de R$ 43,30 sem juros', collection: 'Bootlegs', sizes: SIZES, description: GENERIC_DESCRIPTION },
  { slug: 'lil-wayne-bootleg', image: imgLilWayne, title: 'Camiseta Oversized Lil Wayne Bootleg', price: 'R$ 129,90', installment: '3x de R$ 43,30 sem juros', collection: 'Bootlegs', sizes: SIZES, description: GENERIC_DESCRIPTION },
  { slug: 'billie-eilish-bootleg', image: imgBillieEilish, title: 'Camiseta Oversized Billie Eilish Bootleg', price: 'R$ 129,90', installment: '3x de R$ 43,30 sem juros', collection: 'Bootlegs', sizes: SIZES, description: GENERIC_DESCRIPTION },
  { slug: 'super-oversized-asap-iv-bootleg', image: imgSuperAsapIv, title: 'Camiseta Super Oversized Asap Iv Bootleg', price: 'R$ 129,90', installment: '3x de R$ 43,30 sem juros', collection: 'Bootlegs', sizes: SIZES, description: GENERIC_DESCRIPTION },
]

export function getProductBySlug(slug) {
  return PRODUCTS.find((p) => p.slug === slug)
}
