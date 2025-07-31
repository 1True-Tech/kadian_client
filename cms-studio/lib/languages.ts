// // lib/languages.ts
// export const supportedLanguages = [
//   { id: 'en', title: 'English', isDefault: true },
//   { id: 'fr', title: 'French' },
//   { id: 'ar', title: 'Arabic' }
// ]

// export const baseLanguage = supportedLanguages.find(l => l.isDefault)

// // Helper for localized fields
// export const localizeField = (field: any) => {
// //   const languages = supportedLanguages.map(lang => ({
// //     title: lang.title,
// //     value: lang.id
// //   }))

//   return {
//     ...field,
//     type: 'object',
//     fieldsets: [
//       {
//         title: 'Translations',
//         name: 'translations',
//         options: { collapsible: true }
//       }
//     ],
//     fields: supportedLanguages.map(lang => ({
//       title: lang.title,
//       name: lang.id,
//       type: field.type,
//       fieldset: lang.isDefault ? null : 'translations'
//     }))
//   }
// }
