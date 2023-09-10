import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

export const mailService = {
    query,
    save,
    remove,
    getById,
    createMail,
    createUser,
}

const STORAGE_KEY = 'mails'

_createMails()

async function query(filterBy) {
    try {
        const mails = await storageService.query(STORAGE_KEY)
        let filteredMails = mails
        if(filterBy) {
            const { /*folder,*/ txt, isRead, date } = filterBy
            if(txt !== '') {
                filteredMails = mails.filter((email) => email.body.includes(txt))
            }
            if(isRead !== "") {
                const isReadState = isRead === "true" ? true : false
                filteredMails = filteredMails.filter((email) => email.isRead === isReadState)
            }
            if(date !== "") {
                filteredMails.sort((mail1, mail2) => mail1.sentAt - mail2.sentAt)
                if(date === "desc") filteredMails.reverse()
            }
        }
        
        return filteredMails
    }
    catch(err) {
        console.log(err)
    }
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

function createUser() {
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
                to: 'user@appsus.com'
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
                to: 'user@appsus.com'
            },
            {
                id: 'e103',
                subject: 'Kiss you!',
                body: 'Would love to kiss up sometimes', 
                isRead: false, 
                isStarred: false, 
                sentAt : 1651133930594, 
                removedAt : null, //for later use
                from: 'koko@koko.com', 
                to: 'user@appsus.com'
            }
        ]
        utilService.saveToStorage(STORAGE_KEY, emails)
    }
}




