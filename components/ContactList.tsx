// components/ContactList.tsx
import { Contact } from "@prisma/client";

interface ContactListProps {
  contacts: Contact[];
}

export default function ContactList({ contacts }: ContactListProps) {
  if (contacts.length === 0) {
    return (
      <p className="text-sm text-gray-500">
        No contacts yet. Add a contact to track who you spoke with.
      </p>
    );
  }

  return (
    <ul className="divide-y divide-gray-100">
      {contacts.map((contact) => (
        <li key={contact.id} className="py-3">
          <p className="text-sm font-medium text-gray-900">{contact.name}</p>
          {contact.role && (
            <p className="text-xs text-gray-500">{contact.role}</p>
          )}
          {contact.email && (
            <a
              href={`mailto:${contact.email}`}
              className="text-xs text-indigo-600 hover:underline"
            >
              {contact.email}
            </a>
          )}
          {contact.phone && (
            <p className="text-xs text-gray-500">{contact.phone}</p>
          )}
          {contact.notes && (
            <p className="mt-1 text-xs text-gray-600 whitespace-pre-wrap">
              {contact.notes}
            </p>
          )}
        </li>
      ))}
    </ul>
  );
}
