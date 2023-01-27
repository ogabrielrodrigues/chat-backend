import { hashSync } from 'bcrypt'
import { randomUUID as uuid } from 'node:crypto'

interface UserProps {
  name: string
  username: string
  age: number
  email: string
  password?: string
}

export class User {
  private _id: string
  private pass: string
  private props: UserProps

  constructor(props: UserProps, id?: string, pass?: string) {
    this.props = props

    this.pass = pass ?? hashSync(props.password, 12)
    this._id = id ?? uuid()
  }

  public get id(): string {
    return this._id
  }

  public set name(name: string) {
    this.name = name
  }

  public get name(): string {
    return this.props.name
  }

  public set username(username: string) {
    this.props.username = username
  }

  public get username(): string {
    return this.props.username
  }

  public set age(age: number) {
    this.props.age = age
  }

  public get age(): number {
    return this.props.age
  }

  public set email(email: string) {
    this.props.email = email
  }

  public get email(): string {
    return this.props.email
  }

  public set password(password: string) {
    this.pass = password
  }

  public get password(): string {
    return this.pass
  }
}
