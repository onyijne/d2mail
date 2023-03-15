import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useConverterStore = defineStore('counter', () => {
  //const doubleCount = computed(() => count.value * 2)
  const ns = ['io', 'help', 'support', 'info', 'hi', 'hello', 'admin', 'contact']
  const usernames = ref(ns.join(","))
  const emails = ref([])
  const fileLink = ref('')
  

  const cleanLink = link => {
    const longUrl = link.split('?url=')[1] || link.split('?url=')[0]
    let url = longUrl.split('//')[1] || longUrl.split('//')[0]
    if (url.split('www.')[1] !== undefined) {
      url = url.split('www.')[1]
    }
    return url.split('/')[0]
  }

  const createLink = async () => {
    let textFile = null
    const makeTextFile = (text) => {
      let data = new Blob([text], {type: 'text/plain'});
  
      // If we are replacing a previously generated file we need to
      // manually revoke the object URL to avoid memory leaks.
      if (textFile !== null) {
        window.URL.revokeObjectURL(textFile);
      }
  
      textFile = window.URL.createObjectURL(data);
  
      // returns a URL you can use as a href
      return textFile;
    };
    fileLink.value = makeTextFile(emails.value.join(", "))
  }


const createEmails = domain =>
  usernames.value.split(",").reduce((pv, cv, i) => {
    pv = i === 0 ? `${cv}@${domain}` : `${pv}, ${cv}@${domain}`
    return pv
  }, '')


  const convert = async domains => {
    emails.value = []
    const e = domains.split(',').reduce((pv, cv) => {
      const domain = cleanLink(cv)
      pv.push(createEmails(domain))
      return pv
    }, [])
  
    emails.value = e
    await createLink()
    return { emails: emails.value, fileLink: fileLink.value }
  }

  const resetUsernames =()=> {
    usernames.value = ns.join(', ')
  }

  const setUsernames = (v) => {
    usernames.value = v
  }

  const resetEmails = () => {
    emails.value = []
  }

  return {
    usernames,
    resetUsernames,
    setUsernames,
    convert,
    resetEmails
   }
})
