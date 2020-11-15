import IIdentifiable from "./IIdentifiable";
import ISerializable from "./ISerializable";

interface IEntity<T> extends IIdentifiable, ISerializable<T> {

}

export default IEntity;
