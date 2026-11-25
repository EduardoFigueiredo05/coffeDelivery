import expressoTradicional from '@/assets/coffees/expresso-tradicional.png'
import expressoAmericano from '@/assets/coffees/expresso-americano.png'
import expressoCremoso from '@/assets/coffees/expresso-cremoso.png'
import expressoGelado from '@/assets/coffees/expresso-gelado.png'
import cafeComLeite from '@/assets/coffees/cafe-com-leite.png'
import latte from '@/assets/coffees/latte.png'
import capuccino from '@/assets/coffees/capuccino.png'
import macchiato from '@/assets/coffees/macchiato.png'
import mochaccino from '@/assets/coffees/mochaccino.png'
import chocolateQuente from '@/assets/coffees/chocolate-quente.png'
import cubano from '@/assets/coffees/cubano.png'
import havaiano from '@/assets/coffees/havaiano.png'
import arabe from '@/assets/coffees/arabe.png'
import irlandes from '@/assets/coffees/irlandes.png'

export type CoffeeTag = 'Tradicional' | 'Gelado' | 'Com leite' | 'Especial' | 'Alcoólico'

export interface Coffee {
  id: string
  name: string
  description: string
  tags: CoffeeTag[]
  price: number
  image: string
}

export const DELIVERY_FEE = 3.5

export const coffees: Coffee[] = [
  {
    id: 'expresso-tradicional',
    name: 'Expresso Tradicional',
    description: 'O tradicional café feito com água quente e grãos moídos',
    tags: ['Tradicional'],
    price: 9.9,
    image: expressoTradicional,
  },
  {
    id: 'expresso-americano',
    name: 'Expresso Americano',
    description: 'Expresso diluído, menos intenso que o tradicional',
    tags: ['Tradicional'],
    price: 9.9,
    image: expressoAmericano,
  },
  {
    id: 'expresso-cremoso',
    name: 'Expresso Cremoso',
    description: 'Café expresso tradicional com espuma cremosa',
    tags: ['Tradicional'],
    price: 9.9,
    image: expressoCremoso,
  },
  {
    id: 'expresso-gelado',
    name: 'Expresso Gelado',
    description: 'Bebida preparada com café expresso e cubos de gelo',
    tags: ['Tradicional', 'Gelado'],
    price: 9.9,
    image: expressoGelado,
  },
  {
    id: 'cafe-com-leite',
    name: 'Café com Leite',
    description: 'Meio a meio de expresso tradicional com leite vaporizado',
    tags: ['Tradicional', 'Com leite'],
    price: 9.9,
    image: cafeComLeite,
  },
  {
    id: 'latte',
    name: 'Latte',
    description: 'Uma dose de café expresso com o dobro de leite e espuma cremosa',
    tags: ['Tradicional', 'Com leite'],
    price: 9.9,
    image: latte,
  },
  {
    id: 'capuccino',
    name: 'Capuccino',
    description: 'Bebida com canela feita de doses iguais de café, leite e espuma',
    tags: ['Tradicional', 'Com leite'],
    price: 9.9,
    image: capuccino,
  },
  {
    id: 'macchiato',
    name: 'Macchiato',
    description: 'Café expresso misturado com um pouco de leite quente e espuma',
    tags: ['Tradicional', 'Com leite'],
    price: 9.9,
    image: macchiato,
  },
  {
    id: 'mochaccino',
    name: 'Mocaccino',
    description: 'Café expresso com calda de chocolate, pouco leite e espuma',
    tags: ['Tradicional', 'Com leite'],
    price: 9.9,
    image: mochaccino,
  },
  {
    id: 'chocolate-quente',
    name: 'Chocolate Quente',
    description: 'Bebida feita com chocolate dissolvido no leite quente e café',
    tags: ['Especial', 'Com leite'],
    price: 9.9,
    image: chocolateQuente,
  },
  {
    id: 'cubano',
    name: 'Cubano',
    description: 'Drink gelado de café expresso com rum, creme de leite e hortelã',
    tags: ['Especial', 'Alcoólico', 'Gelado'],
    price: 9.9,
    image: cubano,
  },
  {
    id: 'havaiano',
    name: 'Havaiano',
    description: 'Bebida adocicada preparada com café e leite de coco',
    tags: ['Especial'],
    price: 9.9,
    image: havaiano,
  },
  {
    id: 'arabe',
    name: 'Árabe',
    description: 'Bebida preparada com grãos de café árabe e especiarias',
    tags: ['Especial'],
    price: 9.9,
    image: arabe,
  },
  {
    id: 'irlandes',
    name: 'Irlandês',
    description: 'Bebida a base de café, uísque irlandês, açúcar e chantilly',
    tags: ['Especial', 'Alcoólico'],
    price: 9.9,
    image: irlandes,
  },
]
