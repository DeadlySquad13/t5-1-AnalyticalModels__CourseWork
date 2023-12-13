import { Link } from '../link/link'
import './title-page.css'

export const TitlePage = () => {
    return (
        <section>
            <h1>МГТУ им. Н.Э. Баумана</h1>
            <h3>Курсовая работа по дисциплине</h3>
            <h2>"Аналитические модели Автоматизированных Систем Обработки Информации и Управления"</h2>
            <br />
            <span>Выполнено студентом ИУ5-12М</span>
            <h2>Пакало Александром Сергеевичем</h2>
            <br />
            <Link href="/main">Перейти к работе</Link>
            <br />
            <br />
            <br />
            <br />
            <span>2023 год</span>
        </section >
    )
}
