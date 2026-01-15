import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useClickOutside } from "../../hooks/useClickOutside";
import styles from "./LanguageSwitcher.module.scss";
import Button from "../Button/Button";
import { faGlobe } from "@fortawesome/pro-regular-svg-icons/faGlobe";

type Language = "nl" | "en";

const languages: Array<{ code: Language; name: string }> = [
  { code: "nl", name: "Nederlands" },
  { code: "en", name: "English" },
];

export default function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const { i18n } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => setOpen(false));

  const handleLanguageChange = (code: Language) => {
    i18n.changeLanguage(code);
    setOpen(false);
  };

  return (
    <motion.div
      ref={ref}
      className={styles.languageSwitcher}
      initial="hidden"
      animate="visible"
      onClick={() => setOpen(() => !open)}
    >
      <Button color="blue" onClick={() => {}}>
        <FontAwesomeIcon icon={faGlobe} />
        {i18n.language.toUpperCase()}
      </Button>
      {open && (
        <div className={styles.tooltip}>
          {languages.map((lang) => (
            <p
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={i18n.language === lang.code ? styles.active : ""}
            >
              {lang.name}
            </p>
          ))}
        </div>
      )}
    </motion.div>
  );
}
