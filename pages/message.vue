<template lang="pug">
.fill-height.message-page.pa-0.ma-0
  v-row.pa-0.ma-0.upper-row
    upper-title.ma-0(:title="'WeBot'" :icon="'more-vertical'")
  .scroll.ma-0.justify-top.align-center(:style="scrollSize")
    v-container.pt-0
      v-row
        v-col.pb-0.mt-0(cols="12")
          v-text-field.rounded-xl.message-text-field(outlined
            v-model="message"
            label="You can ask WeBot for recipe"
            :color="$vuetify.theme.themes.light.primary"
            append-outer-icon="mdi-send-circle"
            @keydown=""
            v-on:keyup.enter="goToWeBotPage(null)"
            @click:append-outer="goToWeBotPage(null)")
        //- v-col(cols="12")
        //-   p {{ data }}
        v-col.pt-0(cols="12")
          v-card.rounded-lg.pa-4(outlined)
            v-img.mx-auto.rounded-pill(:src="require(`../assets/img/webot1.gif`)" max-height="200" max-width="200")
            p.caption.secondary--text.text-center.mb-0 Hi, I'm Webot, your Foodie Friend!
            p.caption.grey--text.text-center I'm here to help you cook tasty and affordable meals, from smart shopping to healthier picks.
            p.font-weight-bold.mb-1.tertiary--text You can ask:
            v-row.pb-3
              template(v-for="s in suggestion")
                v-col.pr-1.pl-1.pb-0(cols="6")
                  v-card.pa-2.rounded-lg.fill-height(outlined @click="goToWeBotPage(s)")
                    p.mb-0.font-weight-bold {{s.name}}
                    p.mb-0.caption {{s.text}}

</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import UpperTitle from '../components/UpperTitle.vue'
// It needs money ya > <
import { sendMessageToChatGPT } from '@/store/chatgptService' // Update the path

export default {
  name: 'MessagePage',
  components: {
    UpperTitle
  },
  layout: 'default',
  data () {
    return {
      data: '',
      message: '',
      suggestion: [
        { id: 1, name: 'Suggest a recipe', text: 'of Creamy Carbonara Pasta' },
        { id: 2, name: 'Suggest a recipe', text: 'based on the ingredients I have bought' },
        { id: 3, name: 'Suggest a dish', text: 'for a healthy diet ' },
        { id: 4, name: 'Suggest restaurants', text: 'that sell Nasi Lemak' }
      ]
    }
  },
  computed: {
    ...mapGetters({
      scrollSize: 'screen/getScrollClass',
      quota: 'webot/getQuota'
    })
  },
  methods: {
    ...mapActions({
      addConversation: 'webot/addMessage',
      useQuota: 'webot/reduceQuota'
    }),
    async getRespones (isSuggestion = true, id = -1) {
      if (id === 2) {
        this.message = 'What can I cook if I have: eggs and rice'
      }
      const response = await sendMessageToChatGPT(this.$axios, this.message, isSuggestion)

      if (id === -1) {
        this.webot = this.processText(response)
      } else {
        this.webot = 'Here is my suggestion:\n' + response
        this.webot = this.processText(this.webot)
      }
      this.addConversation({ text: this.webot, isDefault: id > 0, isMe: false, defaultId: id })
    },
    goToWeBotPage (m) {
      if (this.quota < 1) {
        this.message = this.processText(this.message)
        this.addConversation({ text: (m !== null ? m.name + ' ' + m.text : this.message === '' ? 'Suggest a random recipe' : this.processText(this.message)), isDefault: false, isMe: true, defaultId: -1 })

        this.webot = 'You have exceeded the WeBot free quota (5 times). You can purchase more foods to gain more quota. Thank you ^^'
        this.addConversation({ text: this.webot, isDefault: false, isMe: false, defaultId: -1 })

        this.message = ''

        console.log('You have exceeded the WeBot quota (5 times). You can purchase more foods to gain more quota. Thank you ^^')
      } else {
        if (m !== null) {
          // If default message is selected
          const question = m.name + ' ' + m.text

          this.addConversation({ text: question, isDefault: true, isMe: true, defaultId: -1 })
          this.message = m.name + ' ' + m.text

          // Use chatgpt
          this.getRespones(true, m.id)
        } else {
          if (this.message === '') {
            this.message = 'Suggest a random recipe'
          } else {
            this.message = this.processText(this.message)
          }
          this.addConversation({ text: this.message, isDefault: false, isMe: true, defaultId: -1 })

          // Use chatgpt
          this.getRespones(this.message === '')
        }

        // Testing
        // this.webot = 'hello'
        // this.addConversation({ text: this.webot, isDefault: false, isMe: false, defaultId: -1 })

        this.useQuota()
        this.message = ''
      }
      this.$router.push('/webot')
    },
    processText (inputText) {
      this.processedText = inputText.replace(/\\n/g, '\n')
      return this.processedText
    }
  }
}
</script>

<style scoped>
:deep(.scroll) {
  overflow-x: hidden;
  overflow-y: auto;
  width: 100% !important;
}

:deep(.v-text-field--outlined > .v-input__control > .v-input__slot) {
  min-height: 48px !important;
  margin-bottom: 0px;
}

:deep(.v-text-field .v-label) {
  top: 15px;
}

:deep(.v-text-field--outlined .v-label--active) {
  transform: translateY(-19px) scale(0.75) !important;
}

:deep(.v-input__append-outer) {
  margin-top: 12px;
}

:deep(.message-text-field .theme--light.v-icon) {
  color: #FAAF08;
  font-size: 32px;
}
</style>
