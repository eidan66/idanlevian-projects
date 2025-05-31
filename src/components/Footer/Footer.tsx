import { useTranslation } from "react-i18next"

export const Footer = ()=>{
    const {t} = useTranslation()

    return (
        <footer className="text-center py-16 text-slate-500 text-sm">
        <p>{t('projects.footer.1', { year: new Date().getFullYear() })}</p>
        <p>{t('projects.footer.2')}</p>
        </footer>
    )
}