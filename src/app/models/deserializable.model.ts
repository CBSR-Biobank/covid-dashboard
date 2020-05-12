export interface Deserializable {
  /** Called when converting a plain object to derived class. */
  deserialize(input: any): this;
}
