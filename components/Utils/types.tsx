export interface NewUserValues {
    tasks?: Array<Task>
    coins: number,
    rank: string,
    classType: string,
    currentXp: number,
    neededXp: number
    level: number
    folders: string[]
    img: string
    completedTasks: number
    boosters: Array<Boosters>
    items: Array<Items>
}

export interface UserDataValues {
  name: string,
  email: string,
  surname: string
  tasks?: Array<Task>
  coins: number,
  rank: string,
  classType: string,
  currentXp: number,
  neededXp: number
  level: number
  folders: string[]
  img: string
  completedTasks: number
  boosters: Array<Boosters>
  items: Array<Items>
}

export interface Items {
  name: string,
  description: string,
  img: string,
  price: number
}

export interface Boosters {
  name: string,
  description: string,
  img: string,
  multiply: number,
  price: number,
  type: string
}

export interface Task {
    id: string,
    name: string,
    description: string,
    created_date: string,
    difficulty: string,
    status: string,
    folder: string[]
}

export interface RegisterProps {
    name: string,
    email: string,
    password: string,
    surname: string
  }
  
export interface LoginProps {
    password: string,
    email: string,
  }


