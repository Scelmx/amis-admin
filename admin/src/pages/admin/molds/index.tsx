import jsonSchema from './schema.json'
import { Schema } from 'amis-core';
import schema2component from "../../../utils/schema2component";

export default schema2component(jsonSchema as Schema);