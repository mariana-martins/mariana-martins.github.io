import * as React from "react";

import { data } from "../../data";

function ContactInfo(): React.JSX.Element {
  return (
    <section className="col-2 text-text-primary dark:text-text-primary-dark border-b-dashed-custom h-fit">
      <h3 className="text-2xl mb-2">Contact Info</h3>
      <div className="flex flex-col gap-4">
        <p className="text-sm text-gray-500">{data.contact.email}</p>
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-sm text-gray-500">{data.contact.linkedIn}</p>
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-sm text-gray-500">{data.contact.github}</p>
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-sm text-gray-500">{data.contact.address}</p>
      </div>
    </section>
  );
}

export default ContactInfo;
