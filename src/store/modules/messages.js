import messageService from '../../services/messageService'
import {cloneDeep} from "lodash";
import {baseState, baseMutation} from "../state";

const state = {
  ...cloneDeep(baseState),
  messages: []
}

const getters = {
  messages: state => {
    return state.messages
  }
}

const actions = {
  getMessages ({ commit }) {
    messageService.fetchMessages()
    .then(messages => {
      commit('setMessages', messages)
    })
  },
  addMessage({ commit }, message) {
    messageService.postMessage(message)
    .then(() => {
      commit('addMessage', message)
    })
  },
  deleteMessage( { commit }, msgId) {
    messageService.deleteMessage(msgId)
    commit('deleteMessage', msgId)
  }
}

const mutations = {
  ...cloneDeep(baseMutation),
  setMessages (state, messages) {
    state.messages = messages
  },
  addMessage(state, message) {
    state.messages.push(message)
  },
  deleteMessage(state, msgId) {
    state.messages = state.messages.filter(obj => obj.pk !== msgId)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}