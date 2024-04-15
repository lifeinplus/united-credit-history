// import "/node_modules/flag-icons/css/flag-icons.min.css";
// import { useTranslation } from "react-i18next";
// import classNames from "classnames";
// import { useTheme } from "../../../hooks/ThemeContext";

// const LanguageSwitcher = () => {
//     const { i18n } = useTranslation();
//     const { resolvedLanguage, changeLanguage } = i18n;
//     const lang = langs[resolvedLanguage];
//     const { countryCode, nativeName } = lang;
//     const keys = Object.keys(langs).filter((key) => key !== resolvedLanguage);

//     const theme = useTheme();

//     return (
//         <div className="language-switcher dropdown">
//             <button
//                 className={classNames(
//                     "btn",
//                     "btn-outline-primary",
//                     `cch-btn-outline-primary ${theme}`,
//                     "btn-sm",
//                     "dropdown-toggle",
//                 )}
//                 type="button"
//                 data-bs-toggle="dropdown"
//                 aria-expanded="false"
//             >
//                 <span className={`fi fi-${countryCode} me-2`}></span>
//                 {nativeName}
//             </button>
//             <ul
//                 className={classNames(
//                     "dropdown-menu dropdown-menu-md-end",
//                     theme === "dark" && "dropdown-menu-dark",
//                 )}
//             >
//                 {keys.map((key) => {
//                     const { countryCode, nativeName } = langs[key];

//                     return (
//                         <li key={key}>
//                             <button
//                                 className="dropdown-item"
//                                 onClick={() => changeLanguage(key)}
//                                 type="button"
//                             >
//                                 <span
//                                     className={`fi fi-${countryCode} me-2`}
//                                 ></span>
//                                 {nativeName}
//                             </button>
//                         </li>
//                     );
//                 })}
//             </ul>
//         </div>
//     );
// };

// export default LanguageSwitcher;
