<template lang="pug">
.fill-height.message-page.pa-0.ma-0
  v-row.pa-0.ma-0.upper-row
    upper-title.ma-0(:title="'WeBot'" :icon="'more-vertical'"  @goBack="goBackToPreviousPage" :back="true")
  .scroll.ma-0.justify-top.align-center(:style="scrollSize" id="scroll")
    .pb-16
      v-container.pt-4.px-6.pb-16
        template(v-for="(c, index) in conversation")
          .me(v-if="c.isMe")
            v-row
              v-col(cols="1")
              v-col.d-flex.justify-end(col="10")
                v-card.pa-2.rounded-lg.rounded-tr-0.lightOrange(outlined)
                  pre.body-2.wrapped-text {{ c.text }}
              v-col.px-0(cols="1")
                v-avatar(size="32")
                  img(:src="require(`../assets/img/user.png`)" alt="webot")

            v-row.mb-1.mt-1(v-if="index === conversation.length - 1")
              v-col.px-0(cols="1")
                v-avatar.mr-2(size="32")
                  img(:src="require(`../assets/img/webot1.png`)" alt="webot")
              v-col.d-flex.justify-start(cols="10")
                v-card.pa-2.rounded-lg.rounded-tl-0(outlined)
                  p.body-2.wrapped-text.grey--text.mb-2 Webot is working on your response.
                  v-progress-linear(color="red lighten-2"
                    buffer-value="0"
                    stream
                  )
              v-col(cols="1")

          .webot(v-else)
            v-row.mb-1.mt-1
              v-col.px-0(cols="1")
                v-avatar.mr-2(size="32")
                  img(:src="require(`../assets/img/webot1.png`)" alt="webot")
              v-col.d-flex.justify-start(cols="10")
                v-card.pa-2.rounded-lg.rounded-tl-0(outlined)
                  pre.body-2.wrapped-text {{ c.text }}
              v-col(cols="1")
              v-col(cols="1" v-if="c.isDefault && (c.defaultId == 1 || c.defaultId == 2)")
              v-col(cols="10" v-if="c.isDefault && (c.defaultId == 1 || c.defaultId == 2)")
                v-row
                  v-col.pt-0(cols="12")
                    v-card.pa-2.rounded-lg.rounded-tl-0(outlined)
                      pre.body-2.wrapped-text.font-weight-medium(v-if="c.defaultId == 2") You can buy the following ingredients:
                      pre.body-2.wrapped-text.font-weight-medium(v-else) You can use the following ingredients:
                  template(v-for="food in getSuggestedItems(c.defaultId)")
                    v-col.pt-0(cols="6" :class="food.id % 2 == 0 ? 'pl-1' : 'pr-1'")
                      v-card.mx-auto.rounded-lg.pt-4.fill-height(
                        @click=""
                        outlined
                      )
                        v-img.rounded-xl.mx-auto.align-end.text-right(:src="food.file_path" width="140" height="120")
                          v-chip.ma-2.rounded-xl(outlined :color="$vuetify.theme.themes.light.primary" v-if="c.defaultId == 1") {{0.5 * 100}}%
                        .px-4.py-2
                          p.secondary--text.font-weight-medium.mb-0 {{food.name}}
                          p.caption.darkGrey--text.font-weight-light.mb-1 Aeon
                          span.tertiary--text.font-weight-regular.mb-0(v-if="c.defaultId == 1") {{$formatCurrency($discountPrice(food.price*100, 0.5))}}
                          span.tertiary--text.font-weight-regular.mb-0(v-else) 1 Item
              v-col(cols="1" v-if="c.isDefault && (c.defaultId == 1 || c.defaultId == 2)")
    v-footer.white.rounded-t-xl(absolute elevation="4")
      v-col(cols="12")
        v-textarea.rounded-xl.message-text-field(outlined auto-grow hide-details rows="1"
          v-model="message"
          label="You can send WeBot a message"
          :color="$vuetify.theme.themes.light.primary"
          append-outer-icon="mdi-send-circle"
          @keydown=""
          v-on:keyup.enter="sendMessage"
          @click:append-outer="sendMessage")

</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import UpperTitle from '../components/UpperTitle.vue'
// It needs money ya > <
import { sendMessageToChatGPT } from '@/store/chatgptService' // Update the path

export default {
  name: 'WebotPage',
  components: {
    UpperTitle
  },
  layout: 'welcome',
  data () {
    return {
      webot: '',
      message: '',
      suggestion: [
        { id: 1, name: 'Suggest a recipe', text: 'of Creamy Carbonara Pasta' },
        { id: 2, name: 'Suggest food items', text: 'to cook Fried Rice' },
        { id: 3, name: 'Suggest a dish', text: 'for a healthy diet ' },
        { id: 4, name: 'Suggest restaurants', text: 'that are cheap and near to me' }
      ]
    }
  },
  computed: {
    ...mapGetters({
      scrollSize: 'screen/getMessageClass',
      conversation: 'webot/getConversation',
      quota: 'webot/getQuota',
      getSuggestedItems: 'webot/getSuggestedItems'
    }),
    pageHeight () {
      return document.body.scrollHeight
    }
  },
  mounted () {
    // Use JavaScript to scroll to the bottom of the page
    this.scrollToBottom()
  },
  methods: {
    ...mapActions({
      addConversation: 'webot/addMessage',
      useQuota: 'webot/reduceQuota'
    }),
    scrollToBottom () {
      // Scroll to the bottom of the page
      console.log('Document body scroll height:', document.getElementById('scroll').scrollHeight)
      const scroll = document.getElementById('scroll')
      scroll.scrollTop = scroll.scrollHeight
    },
    async getRespones () {
      const response = await sendMessageToChatGPT(this.$axios, this.message, false)
      this.webot = response
      this.webot = this.processText(this.webot)
      this.addConversation({ text: this.webot, isDefault: false, isMe: false, defaultId: -1 })
    },
    sendMessage () {
      if (this.quota < 1) {
        this.message = this.processText(this.message)
        this.addConversation({ text: this.message, isDefault: false, isMe: true, defaultId: -1 })

        this.webot = 'You have exceeded the WeBot free quota (5 times). You can purchase more foods to gain more quota. Thank you ^^'
        this.addConversation({ text: this.webot, isDefault: false, isMe: false, defaultId: -1 })

        this.message = ''

        console.log('You have exceeded the WeBot quota (5 times). You can purchase more foods to gain more quota. Thank you ^^')
      } else {
        if (this.message !== '') {
          this.message = this.processText(this.message)
          this.addConversation({ text: this.message, isDefault: false, isMe: true, defaultId: -1 })

          // Use chatgpt
          this.getRespones()

          // Testing
          // this.webot = '"- Boil water with salt. \n- Add pasta, cook until al dente. \n- In a pan, heat olive oil and sauté garlic. \n- Add diced tomatoes, basil, and season with salt and pepper. - Simmer for 10 minutes. - Drain pasta and toss with tomato sauce. - Serve with grated Parmesan cheese. Enjoy!"'
          // this.webot = 'hello'
          // this.addConversation({ text: this.webot, isDefault: false, isMe: false, defaultId: -1 })

          this.useQuota()
          this.message = ''
        }
        console.log(this.quota < 1)
      }
    },
    goBackToPreviousPage () {
      this.$router.push('/message')
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

.wrapped-text {
  white-space: pre-wrap;
}

:deep(.vhl-item) {
  padding-top: 4px !important;
}

.v-chip.v-chip--outlined.v-chip.v-chip {
  background-color: white !important;
  border-width: 2px;
  font-weight: 500;
  font-size: 13px;
  height: 16px
}

.text-12 {
  font-size: 12px;
}
</style>
