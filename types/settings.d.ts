export interface NotificationSettings {
  orderUpdates: boolean;
  promotions: boolean;
  newsletter: boolean;
  productAlerts: boolean;
}

export interface SecuritySettings {
  twoFactorEnabled: boolean;
  lastPasswordChange: string;
}

export interface AccountSettings {
  notifications: NotificationSettings;
  security: SecuritySettings;
}
