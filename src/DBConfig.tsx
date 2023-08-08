export const DBConfig = {
  name: "MyDB",
  version: 1,
  objectStoresMeta: [
    {
      store: "notes",
      storeConfig: { keyPath: "id", autoIncrement: true },
      storeSchema: [
        { name: "id", keypath: "id", options: { unique: false } },
        { name: "title", keypath: "title", options: { unique: false } },
        { name: "body", keypath: "body", options: { unique: false } },
        { name: "tags", keypath: "tags", options: { unique: false } },
      ],
    },
  ],
};