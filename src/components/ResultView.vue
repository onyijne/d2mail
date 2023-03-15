<script setup>
import ResultItem from './ResultItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'

defineProps({
  emails: {
    type: Array,
    required: true
  },
  fileLink: {
    type: String,
    required: true
  }
})

const displayEmail = (emails) => {
  let count = 0
  let holder = []
  return emails.reduce((pv, cv, ci, arr) => {
    count = count + 1
    holder.push(cv)
    if (ci === (arr.length - 1))  {
      // the last value
      pv = `${pv}<li>${holder.join(', ')}</li>`
    } else if (count === 10) {
      pv = `${pv}<li>${holder.join(', ')}</li>`
      holder = []
      count = 0
    }
    return pv
  }, '')
}

const copyToClip = async (emails, ev) => {
  try {
    const btn = ev.target
    await navigator.clipboard.writeText(emails.join(','))
    btn.textContent = 'copied'
    setTimeout(() => {
      btn.textContent = 'Copy emails'
    }, 3000);
  } catch (error) {
    console.log(error.message)
  }
}
</script>

<template>
  <ResultItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>Emails</template>
    <div>
      <ul v-html="displayEmail(emails) ">
      </ul>
    </div>
    <div>
      <br />
      <button class="copyclip" @click="$ev => copyToClip(emails, $ev)">copy emails</button>
      &nbsp; &nbsp;
      <a :href="fileLink" :download="fileLink">Download</a>
    </div>
  </ResultItem>
</template>
