import { hashSync } from 'bcrypt'
import { randomUUID as uuid } from 'node:crypto'

interface UserProps {
  username: string
  email: string
  active?: boolean
  password?: string
}

export class User {
  private _id: string
  private pass: string
  private props: UserProps

  constructor(props: UserProps, id?: string, pass?: string) {
    this.props = props

    this.props.active = props.active ?? false

    this.pass = pass ?? hashSync(props.password, 12)
    this._id = id ?? uuid()
  }

  public get id(): string {
    return this._id
  }

  public set username(username: string) {
    this.props.username = username
  }

  public get username(): string {
    return this.props.username
  }

  public set email(email: string) {
    this.props.email = email
  }

  public get email(): string {
    return this.props.email
  }

  public set active(active: boolean) {
    this.props.active = active
  }

  public get active(): boolean {
    return this.props.active
  }

  public set password(password: string) {
    this.pass = password
  }

  public get password(): string {
    return this.pass
  }
}
