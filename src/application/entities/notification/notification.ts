import { Replace } from 'src/helpers/Replace';
import { NotificationContent } from './notification-content';

interface NotificationProps {
  content: NotificationContent;
  category: string;
  readAt?: Date | null;
  createdAt: Date;
  recipientId: string;
}

export class Notification {
  private props: NotificationProps;

  constructor(props: Replace<NotificationProps, { createdAt?: Date }>) {
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public get category(): string {
    return this.props.category;
  }

  public set category(value: string) {
    this.props.category = value;
  }

  public get readAt(): Date | null | undefined {
    return this.props.readAt;
  }

  public set readAt(value: Date | null | undefined) {
    this.props.readAt = value;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get recipientId(): string {
    return this.props.recipientId;
  }

  public set recipientId(value: string) {
    this.props.recipientId = value;
  }

  public set content(content: NotificationContent) {
    this.props.content = content;
  }

  public get content(): NotificationContent {
    return this.props.content;
  }
}
