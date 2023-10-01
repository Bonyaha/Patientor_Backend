**In this project we are not use ts-node. Instead we use official TypeScript compiler**
**npm run tsc - this command runs TypeScript compiler and it creates a production build**
*In this and following projects is used ts-node-dev instead of nodemon. It takes care of recompilation on every change, so restarting the application won't be necessary.*

All routers and modules which are responsible for handling a set of specific resources such as diaries, are under the directory `src/routes`
The router taking care of all diary endpoints is in `src/routes/diaries.ts`
actual data manipulations are in `src/services` directory (it is quite a common practice to separate the "business logic" from the router code into modules, which are quite often called services
)

## Code related questions:
**Q**: in entries.json we don't export tha data, but how then we are able to import it in diaryService.ts - import diaryData from '../../data/entries.json'; ?
**A**: In JavaScript and TypeScript, you can import data from JSON files without explicitly exporting anything from the JSON file itself. When you import a JSON file using a statement like import diaryData from '../../data/entries.json';, the JavaScript/TypeScript runtime automatically understands that you want to import the contents of the JSON file as a JavaScript/TypeScript object.

**Q**: const getEntries = (): DiaryEntry[] => {
	return diaries;
};
Does this part - : DiaryEntry[]  - means that the function getEntries must return an array consisting of objects of DiaryEntry type?
**A**: The : DiaryEntry[] indicates that the getEntries function is expected to return an array where each element is of type DiaryEntry. In other words, it enforces that the return value of the getEntries function should be an array containing objects that conform to the structure defined by the DiaryEntry interface.