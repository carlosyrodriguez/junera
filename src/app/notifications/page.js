"use client";
import { useEffect, useState } from 'react'; 
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import axios from 'axios'; 
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// Define notification types and icons
const notificationTypes = {
  NEW_USER: { icon: "🌱", label: "User Account Created" },
  NEW_FOLLOWER: { icon: "🙋", label: "New Follower" },
  info: { icon: "ℹ️", label: "Information" },
  warning: { icon: "⚠️", label: "Warning" },
};

export default function Login() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [notifications, setNotifications] = useState([]); 

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/login');
      } else {
        // Fetch notifications with Authorization header
        axios.get('/api/notifications', {
          headers: {
            Authorization: `Bearer ${user.token}`, 
          },
        })
          .then(response => {
            console.log('Notifications:', response.data);
            setNotifications(response.data);
          })
          .catch(error => {
            console.error('Error fetching notifications:', error);
          });
      }
    }
  }, [user, router]);

  return (
    <div className="container mx-auto py-10 p-4 max-w-4xl">
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/notifications">Notifications</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>
      {/* Render notifications */}
      <div className="flex flex-col gap-4 w-full">
        {notifications.map((notification) => {
          const notificationType = notificationTypes[notification.type] || {};
          return (
            <div key={notification.id} className="notification-item mb-4 rounded-lg shadow-sm">
              <div className="flex items-center gap-2">
                <span className="text-xl">{notificationType.icon}</span>
                <p className="text-lg font-semibold">{notificationType.label || notification.type}</p>
              </div>
              <p className="text-gray-600">{notification.senderFirstName} {notification.senderLastName}</p>
              <p className="text-gray-500 text-sm">{new Date(notification.createdAt).toLocaleString()}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}