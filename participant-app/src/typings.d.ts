/* SystemJS module definition */
declare var module: {
  id: string;
};

declare var require: any;

declare module '*.json' {
  const value: any;
  export default value;
}
