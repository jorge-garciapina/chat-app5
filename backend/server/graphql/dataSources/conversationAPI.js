const { RESTDataSource } = require("apollo-datasource-rest");

class ConversationService extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "http://localhost:3003/conversation/";
    // this.baseURL = "http://conversation-service:3003/conversation/";
  }

  willSendRequest(request) {
    request.headers.set("Authorization", this.context.token);
  }

  async sendMessage({ sender, receiver, id, content }) {
    const response = await this.post(`sendMessage`, {
      sender,
      receiver,
      id,
      content,
    });
    if (response.error) {
      throw new Error(response.error);
    }
    return response;
  }

  async createGroupConversation({
    creator,
    validatedReceivers,
    rejectedReceivers,
  }) {
    const response = await this.post(`createGroupConversation`, {
      creator,
      validatedReceivers,
      rejectedReceivers,
    });
    if (response.error) {
      throw new Error(response.error);
    }
    return response;
  }

  async retrieveMessagesFromConversation(id) {
    const response = await this.get(`retrieveMessagesFromConversation/${id}`);
    if (response.error) {
      throw new Error(response.error);
    }
    return response;
  }

  async retrieveParticipantsFromConversation(id) {
    const response = await this.get(
      `retrieveParticipantsFromConversation/${id}`
    );
    if (response.error) {
      throw new Error(response.error);
    }
    return response;
  }
}

module.exports = ConversationService;
