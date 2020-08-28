import Vue from 'vue'

const formatDate = (CurrentDate) => {
    let date = new Date(CurrentDate),
        day = (date.getDate() + 1).toString(),
        dayF = (day.length == 1) ? '0' + day : day,
        month = (date.getMonth() + 1).toString(),
        monthF = (month.length == 1) ? '0' + month : month,
        yearF = date.getFullYear()

    return dayF+'/'+monthF+'/'+yearF
}

const formatPrice = (price) => price.toLocaleString('pt-br', {minimumFractionDigits: 2})
Vue.filter('dateformat', formatDate)
Vue.filter('formatprice', formatPrice)