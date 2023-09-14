export default class Address {
  _street: string = ""
  _number: string = ""
  _city: string = ""
  _zip: string = ""

  constructor(street: string, _number: string, city: string, zip: string) {
    this._street = street
    this._number = _number
    this._city = city
    this._zip = zip
    this.validate()
  }

  get street() {
    return this._street
  }

  get number() {
    return this._number
  }

  get city() {
    return this._city
  }

  get zip() {
    return this._zip
  }

  validate() {
    if (this._street.length == 0) {
      throw new Error("Street is required")
    }

    if (this._number.length == 0) {
      throw new Error("Number is required")
    }

    if (this._city.length == 0) {
      throw new Error("City is required")
    }

    if (this._zip.length == 0) {
      throw new Error("Zip is required")
    }
  }

  toString() {
    return `${this._street}, ${this._number}, ${this._city} ${this._zip}`
  }
}