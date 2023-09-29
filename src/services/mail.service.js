import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

export const mailService = {
    query,
    save,
    remove,
    getById,
    createMail,
    getUser,
    getFilterFromParams,
}

const STORAGE_KEY = 'mails'

_createMails()

async function query(filterBy) {
    try {
        const mails = await storageService.query(STORAGE_KEY)
        let filteredMails = mails.filter((email) => email.isTrash === false && email.from !== getUser().email)
        if(filterBy) {
            filteredMails = filterMails(filterBy, mails)
        }
        return filteredMails
    }
    catch(err) {
        console.log(err)
    }
}

async function filterMails(filterBy, mails) {
    let newMails = mails.filter((email) => email.isTrash === false && email.from !== getUser().email)
    const { folder, txt, isRead, date, order } = filterBy
        if(folder !== '') {
            switch(folder) {
                case "Starred":
                    newMails = newMails.filter((email) => email.isStarred === true && email.isTrash === false && email.sentAt !== null)
                    break;
                case "Sent":
                    newMails = mails.filter((email) => email.from === getUser().email && email.isTrash === false && email.sentAt !== null)
                    break;
                case "Draft":
                    newMails = await storageService.query(STORAGE_KEY)
                    newMails = newMails.filter((email) => email.sentAt === null && email.isTrash === false)
                    break;
                case "Trash":
                    newMails = mails.filter((email) => email.isTrash === true)
                    break;
                default: newMails = newMails.filter((email) => email.isTrash === false && email.sentAt !== null)
            }
        }
        if(txt !== '') {
            newMails = newMails.filter((email) => email.body.includes(txt) || email.from.includes(txt) || email.subject.includes(txt))
        }
        if(isRead !== "") {
            const isReadState = isRead === "true" ? true : false
            newMails = newMails.filter((email) => email.isRead === isReadState)
        }
        if(date !== "") {
            const dateFilter = new Date(date)
            newMails = newMails.filter((email) => {
                const emailDate = new Date(email.sentAt)
                return emailDate.getFullYear() === dateFilter.getFullYear() &&
                emailDate.getMonth() === dateFilter.getMonth() &&
                emailDate.getDay() === dateFilter.getDay()
            })
        }
        if(order !== "") {
            newMails.sort((mail1, mail2) => mail1.sentAt - mail2.sentAt)
            if(order === "desc") newMails.reverse()
        }
    return newMails
}

function getById(id) {
    return storageService.get(STORAGE_KEY, id)
}

function remove(id) {
    return storageService.remove(STORAGE_KEY, id)
}

function save(mailToSave) {
    if (mailToSave.id) {
        return storageService.put(STORAGE_KEY, mailToSave)
    } else {
        return storageService.post(STORAGE_KEY, mailToSave)
    }
}

async function createMail(email) {
    const mail = {
        subject: email.subject ? email.subject : "",
        body: email.body ? email.body : "", 
        isRead: email.isRead ? email.isRead : false, 
        isStarred: email.isStarred ? email.isStarred : false, 
        sentAt: email.sentAt ? email.sentAt : null, 
        removedAt : email.removedAt ? email.removedAt : null, //for later use
        from: email.from ? email.from : mailService.getUser().email, 
        to: email.to ? email.to : "",
        isTrash: email.isTrash ? email.isTrash : false,
    }
    let newMail
    await save(mail).then((res) => newMail = res)
    console.log("mail created")
    return newMail
}

function getUser() {
    return {
        email: 'user@appsus.com', fullname: 'Mahatma Appsus'
    }
}

function getDefaultFilter() {
    return {
        folder: "",
        txt: "",
        isRead: "",
        date: "",
        order: ""
    }
}

function getFilterFromParams(searchParams) {
    const defaultFilter = getDefaultFilter()
    const filterBy = {}
    for (const field in defaultFilter) {
        filterBy[field] = searchParams.get(field) || ''
    }

    return filterBy
}

function _createMails() {
    let emails = utilService.loadFromStorage(STORAGE_KEY)
    if (!emails || !emails.length) {
        emails = [
            {
                id: 'e101',
                subject: 'Miss you!',
                body: 'Would love to catch up sometimes', 
                isRead: false, 
                isStarred: false, 
                sentAt : 1511133930594, 
                removedAt : null, //for later use
                from: 'momo@momo.com', 
                to: 'user@appsus.com',
                isTrash: false
            },
            {
                id: 'e102',
                subject: 'Diss you!',
                body: 'Would hate to catch up sometimes', 
                isRead: true, 
                isStarred: true, 
                sentAt : 1571133930594, 
                removedAt : null, //for later use
                from: 'jojo@jojo.com', 
                to: 'user@appsus.com',
                isTrash: false
            },
            {
                id: 'e103',
                subject: 'Kiss you!',
                body: 'Would love to kiss up sometimes', 
                isRead: false, 
                isStarred: false, 
                sentAt : 1651133930594, 
                removedAt : null, //for later use
                from: 'user@appsus.com', 
                to: 'koko@koko.com',
                isTrash: true
            },
            {
                id: 'e104',
                subject: 'Biss you!',
                body: 'Would bate to catch up sometimes', 
                isRead: false, 
                isStarred: false, 
                sentAt : 1571133930594, 
                removedAt : null, //for later use
                from: 'bobo@bobo.com', 
                to: 'user@appsus.com',
                isTrash: false
            },
            {
                id: 'e105',
                subject: 'ciss you!',
                body: 'Would cate to catch up sometimes', 
                isRead: true, 
                isStarred: true, 
                sentAt : 1571133930594, 
                removedAt : null, //for later use
                from: 'coco@coco.com', 
                to: 'user@appsus.com',
                isTrash: true
            },
            {
                id: 'e106',
                subject: 'eiss you!',
                body: 'Would eate to catch up sometimes', 
                isRead: false, 
                isStarred: false, 
                sentAt : 1571133930594, 
                removedAt : null, //for later use
                from: 'joeo@eoeo.com', 
                to: 'user@appsus.com',
                isTrash: false
            },
            {
                id: 'e107',
                subject: 'giss you!',
                body: 'Would gate to catch up sometimes', 
                isRead: true, 
                isStarred: true, 
                sentAt : 1571133930594, 
                removedAt : null, //for later use
                from: 'gojo@jogo.com', 
                to: 'user@appsus.com',
                isTrash: false
            },
            {
                id: 'e108',
                subject: 'liss you!',
                body: 'Would late to catch up sometimes', 
                isRead: false, 
                isStarred: false, 
                sentAt : 1571133930594, 
                removedAt : null, //for later use
                from: 'lojo@jolo.com', 
                to: 'user@appsus.com',
                isTrash: false
            },
        ]
        utilService.saveToStorage(STORAGE_KEY, emails)
    }
}




