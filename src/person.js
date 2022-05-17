export class Person {
    constructor({ id, vehicles, distanceTraveled, startDate, endDate }) {
        this.id = id
        this.vehicles = vehicles
        this.distanceTraveled = distanceTraveled
        this.startDate = startDate
        this.endDate = endDate
    }

    formatDate(date) {
        const [year, month, day] = date.split('-').map(Number)

        return new Date(year, month -1, day)
    }

    formatted(language) {
        return {
            id: Number(this.id),
            vehicles: new Intl
                .ListFormat(language, {
                    style: 'long', type: 'conjunction'
                })
                .format(this.vehicles),
            distanceTraveled: new Intl
                .NumberFormat(language, { 
                    style: 'unit', 
                    unit: language === 'en' ? 'mile' : 'kilometer'
                })
                .format(this.distanceTraveled),
            startDate: new Intl
                .DateTimeFormat(language, { month: 'long', day: '2-digit', year: 'numeric' })
                .format(this.formatDate(this.startDate)),
            endDate: new Intl
                .DateTimeFormat(language, { month: 'long', day: '2-digit', year: 'numeric' })
                .format(this.formatDate(this.endDate))
        }
    }
}
