const { RESTDataSource } = require("apollo-datasource-rest");

class UserService extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.USER_SERVICE_CONNECTION;
    // this.baseURL = "http://user-service:3002/user";
  }

  willSendRequest(request) {
    request.headers.set("Authorization", this.context.token);
  }

  async getUsersUser() {
    return this.get("usersUser");
  }

  async createUser({ email, username, avatar, contactList }) {
    const response = await this.post(`create`, {
      email,
      username,
      avatar,
      contactList,
    });

    if (response.error) {
      throw new Error(response.error);
    }

    return response;
  }

  async getUserInfo({ validatedUser }) {
    const response = await this.get(`info/${validatedUser}`);

    if (response.error) {
      throw new Error(response.error);
    }

    return {
      email: response.email,
      username: response.username,
      contactList: response.contactList,
      avatar: response.avatar,
      receivedContactRequests: response.receivedContactRequests,
      rejectedContactRequests: response.rejectedContactRequests,
      pendingContactRequests: response.pendingContactRequests,
      //TODO: Return chatsOneToOne and chatsGroup
    };
  }

  async verifyIfPreviousConversationExists({ sender, receiver }) {
    const response = await this.get(
      `verifyIfPreviousConversationExists/${sender}?receiver=${receiver}`
    );

    if (response.error) {
      throw new Error(response.error);
    }

    return response;
  }

  //////////////////////////////////////////
  async retrieveContactRequests({ validatedUser }) {
    const response = await this.get(`retrieveContactRequests/${validatedUser}`);

    if (response.error) {
      throw new Error(response.error);
    }

    return response;
  }

  async retrievePendingContactRequests({ validatedUser }) {
    const response = await this.get(
      `retrievePendingContactRequests/${validatedUser}`
    );

    if (response.error) {
      throw new Error(response.error);
    }

    return response;
  }

  async searchUser({ searchTerm, validatedUser }) {
    const response = await this.post(`searchUser`, {
      searchTerm,
      validatedUser,
    });

    if (response.error) {
      throw new Error(response.error);
    }

    return response;
  }

  async sendContactRequest({ validatedUser, receiverUsername }) {
    const response = await this.post(`sendContactRequest`, {
      validatedUser,
      receiverUsername,
    });

    if (response.error) {
      throw new Error(response.error);
    }

    return response;
  }

  async acceptContactRequest({ validatedUser, senderUsername }) {
    const response = await this.post(`acceptContactRequest`, {
      validatedUser,
      senderUsername,
    });

    if (response.error) {
      throw new Error(response.error);
    }

    return response;
  }

  async rejectContactRequest({ validatedUser, senderUsername }) {
    const response = await this.post(`rejectContactRequest`, {
      validatedUser,
      senderUsername,
    });

    if (response.error) {
      throw new Error(response.error);
    }

    return response;
  }

  async deleteContact({ validatedUser, receiverUsername }) {
    const response = await this.post("deleteContact", {
      validatedUser,
      receiverUsername,
    });

    if (response.error) {
      throw new Error(response.error);
    }

    return response;
  }

  async cancelRequest({ validatedUser, receiverUsername }) {
    const response = await this.post(`cancelRequest`, {
      validatedUser,
      receiverUsername,
    });

    if (response.error) {
      throw new Error(response.error);
    }

    return response;
  }

  async addConversationIdToParticipantsProfiles({
    chatID,
    creator,
    receivers,
    isGroup,
  }) {
    const response = await this.post(
      `addConversationIdToParticipantsProfiles`,
      {
        chatID,
        creator,
        receivers,
        isGroup,
      }
    );
    if (response.error) {
      throw new Error(response.error);
    }
    return response;
  }
}

module.exports = UserService;
