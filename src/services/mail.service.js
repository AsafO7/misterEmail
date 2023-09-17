import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

export const mailService = {
    query,
    save,
    remove,
    getById,
    createMail,
    getUser,
}

const STORAGE_KEY = 'mails'

_createMails()

async function query(filterBy) {
    try {
        const mails = await storageService.query(STORAGE_KEY)
        let filteredMails = mails
        if(filterBy) {
            filteredMails = filterMails(filterBy, mails)
        }
        return filteredMails
    }
    catch(err) {
        console.log(err)
    }
}

function filterMails(filterBy, mails) {
    let newMails = mails.filter((email) => email.isTrash === false)
    const { folder, txt, isRead, date } = filterBy
        if(folder !== '') {
            switch(folder) {
                case "Starred":
                    newMails = mails.filter((email) => email.isStarred === true && email.isTrash === false)
                    break;
                case "Sent":
                    newMails = mails.filter((email) => email.from === getUser().email && email.isTrash === false)
                    break;
                case "Draft":
                case "Trash":
                    newMails = mails.filter((email) => email.isTrash === true)
                    break;
                default: newMails = mails.filter((email) => email.isTrash === false)
            }
        }
        if(txt !== '') {
            newMails = mails.filter((email) => email.body.includes(txt))
        }
        if(isRead !== "") {
            const isReadState = isRead === "true" ? true : false
            newMails = newMails.filter((email) => email.isRead === isReadState)
        }
        if(date !== "") {
            newMails.sort((mail1, mail2) => mail1.sentAt - mail2.sentAt)
            if(date === "desc") newMails.reverse()
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

function createMail(subject = "A", body = "B", to = "C", from = "D") {
    return {
        subject,
        body,
        to,
        from,
    }
}

function getUser() {
    return {
        email: 'user@appsus.com', fullname: 'Mahatma Appsus'
    }
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




