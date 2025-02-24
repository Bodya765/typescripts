import { 
  SubscribeMessage, 
  WebSocketGateway, 
  WebSocketServer, 
  OnGatewayConnection, 
  OnGatewayDisconnect 
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

interface User {
  id: string;
  nickname: string;
}

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private users: User[] = [];

  handleConnection(client: Socket) {
    console.log(`Користувач підключився: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.users = this.users.filter(user => user.id !== client.id);
    this.server.emit('updateUsers', this.users);
    console.log(`Користувач відключився: ${client.id}`);
  }

  @SubscribeMessage('setNickname')
  handleSetNickname(client: Socket, nickname: string) {
    this.users.push({ id: client.id, nickname });
    this.server.emit('updateUsers', this.users);
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, text: string) {
    const user = this.users.find(u => u.id === client.id);
    if (user) {
      client.broadcast.emit('message', { nickname: user.nickname, text });
    }
  }

  @SubscribeMessage('typing')
  handleTyping(client: Socket, isTyping: boolean) {
    const user = this.users.find(u => u.id === client.id);
    if (user) {
      client.broadcast.emit('typing', { nickname: user.nickname, isTyping });
    }
  }
}
