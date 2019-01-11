/**
* The ECMAScript Language Specification lays the foundation by using Unicode for 
* text representation and by providing a few language-sensitive functions, but 
* gives applications little control over the behaviour of these functions. 
* The ECMAScript Internationalization API builds on this by providing a set of 
* customizable language-sensitive functionality. The API is useful even for 
* applications that themselves are not internationalized, as even applications 
* targeting only one language and one region need to properly support that one 
* language and region. However, the API also enables applications that support 
* multiple languages and regions, even concurrently, as may be needed in server 
* environments.
*
* ECMA-402 http://ecma-international.org/ecma-402/1.0/
*/

//Include the specific locale which apply to all module's i18n
import locale from '../src/locales/zh-CN'

// Internationalization of software means designing it such that it supports 
// or can be easily adapted to support the needs of users speaking different 
// languages and having different cultural expectations, and enables worldwide 
// communication between them. Localization then is the actual adaptation to a 
// specific language and culture. Globalization of software is commonly 
// understood to be the combination of internationalization and localization. 
// Globalization starts at the lowest level by using a text representation that 
// supports all languages in the world, and using standard identifiers to identify 
// languages, countries, time zones, and other relevant parameters. It continues 
// with using a user interface language and data presentation that the user 
// understands, and finally often requires product-specific adaptations to the 
// user’s language, culture, and environment.
//
//This file is global setting of internationalization. All the modules 
//need i18n just include it, and also When need change the locale, just
//change this file's include.
//
//When the i18n has determined, there was no need to change the file again,
//then the left to do just change the separately setting file.
export default locale