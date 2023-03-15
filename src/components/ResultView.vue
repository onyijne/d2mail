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
    <div ref="mails">{{ emails.join(',') }}</div>
    <div>
      <br />
      <button class="copyclip" @click="$ev => copyToClip(emails, $ev)">copy emails</button>
      &nbsp; &nbsp;
      <a :href="fileLink" :download="fileLink">Download</a>
    </div>
  </ResultItem>
</template>
