"use client";
import React, { useMemo, useState } from "react";
// Import Lucide icons
import { 
  Plus, 
  Search, 
  MoreVertical, 
  RotateCcw, 
  Ban, 
  Mouse, 
  Cable, 
  Pencil, 
  Home,
  type LucideIcon 
} from "lucide-react";

type Role = "Admin" | "Manager" | "Customer";
type Status = "Active" | "Inactive";

type User = {
  id: number;
  name: string;
  email: string;
  role: Role;
  status: Status;
  avatar: string;
  phone: string;
};

const USERS: User[] = [
  {
    id: 1023,
    name: "Sarah Jones",
    email: "sarah@example.com",
    role: "Manager",
    status: "Active",
    phone: "+1 555-0123",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBHii5ssi095mV3wNbrSzZNKgqsYsz1xeoEYHpqb84UQreT08VuGlbGR8IAXMl7spL3smIGtI57ATflxSXGc-eHaUwgfLr-Xq2xithwJJIlPlf3mygY1FdygFnX17T0RcT7Vg-6oUgvuMpYnIvxWabRfQPXeQdf2JDMKbjPF5b4Qi4lK8jrS6h29z0sTf2ToLR4I5xzXJTZev_7mWJlrAaw5yD5O0sJn7ihAajmHezUVj8ASzhpl9tOvIryAEMOqh5DJdPZ_9UuUw",
  },
  {
    id: 1024,
    name: "Mike Ross",
    email: "mike@example.com",
    role: "Customer",
    status: "Active",
    phone: "+1 555-0144",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDiZjNKV75lGLPAMK_OW4vWiZwcbQi_lG_PFI3ps775ioCtOd-UF79Q2qzZymSThRQbmM50dfrU5E-r1VRVJwIBvNkImypgFjxHz4JwcDs48Xj3mk_vJZw3TK1EDPUOU0kljR__flF9uLse-e32EinrcSHLEU9U2gs9bjya7NpOB5UKS23WH13BKFIlPMx-3vFQo7M7GeH7w5w6UsR-CTCS8SMspsFWBzm_E26rQXv1zSL9SB39xCz3cuCNdnlubQ4C2UadRcvI1g",
  },
  {
    id: 1025,
    name: "Rachel Zane",
    email: "rachel@example.com",
    role: "Admin",
    status: "Inactive",
    phone: "+1 555-0999",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCYQDj68k3yXoFnJ9PulRMwid-t6fk0kctEXVBu0ydoWLhCBBg-OwNg0IXfC9zNT9wkIoV8VWFzteFoJuQdpQlreMIkcFa-tL-Ok4aEPgcw4ReEFyNNVPdigDLO7aGXrPwF4u4QDiH-x83eA-3-zp4avPiySv5JhKz0fgwq6w5uJjvNOuM6kZECzMtpgf0XPM9qsUOBHhXQjwdBgur4nZEuqgkst3PubYEjjgRR7l795jJ7OGDAVQD-1V2fmDMlrB4SM3UrSfVz0Q",
  },
  {
    id: 1026,
    name: "Harvey Specter",
    email: "harvey@pearson.com",
    role: "Manager",
    status: "Active",
    phone: "+1 555-7777",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAcwx5TLaMf7dx5lJlVlyDbduh-JPvBtnQx5_vxCEQ3NgIJwfgx-Jg5r7Yaub-S4zJIUKyZK77zbXO7nI4Ged8nRW8htgEvKXjQOwd68fRnk-hejbloNLI2NPHUeF_kD-XO6UgdXkaqS6rY6-sAOpJBzXDj01aLobw4OdVgoSIgz-T_inwjnExm_R3U62cX2CNXd8eXPkGaG9Y4EjD01RjQg4C0J_pV07IdgVepncnFJFrsw7nF8XsLiUTOtwRibjuDhonkUG5ktg",
  },
  {
    id: 1027,
    name: "Louis Litt",
    email: "louis@example.com",
    role: "Customer",
    status: "Active",
    phone: "+1 555-2222",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDTgmaJ_O3YQWbgNpdrDFkqbWtbjeSJbTAc-rTH1Z9rc9cl6f4GMqldI3WQa2ZEjj1m0xfy0O0-v7NhPB3Dto5oCZumwga0FqVVg7Cu8kfHxjyWaGVcOhmj4_tFSbqa_IsrI_MHMJV7uRZtaYtMNFS7RNW95d9_aFCQy5X4MU2rv3JrIbIocMt6lfxUdt_HLuTYzqGF7zPJQDP-YvFO609oC_Mft-tEd2-2oC31D-LC_U3NpmLM5XXRLloKR_MD9D-GdBPnVV7GVw",
  },
];

function badgeRole(role: Role) {
  if (role === "Admin") return "bg-red-100 text-red-800";
  if (role === "Manager") return "bg-purple-100 text-purple-800";
  return "bg-blue-100 text-blue-800";
}
function badgeStatus(status: Status) {
  if (status === "Active") return "bg-green-100 text-green-800";
  return "bg-slate-100 text-slate-600";
}

export default function Users() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"ALL" | Role>("ALL");
  const [selectedId, setSelectedId] = useState<number>(USERS[0]?.id ?? 0);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return USERS.filter((u) => {
      const okFilter = filter === "ALL" ? true : u.role === filter;
      const okQuery =
        !q ||
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        String(u.id).includes(q);
      return okFilter && okQuery;
    });
  }, [query, filter]);

  const selected = useMemo(
    () => USERS.find((u) => u.id === selectedId) ?? USERS[0],
    [selectedId]
  );

  if (!selected) return null;

  return (
    <div className="flex h-[calc(100vh-0px)] w-full overflow-hidden bg-[#f6f6f8] text-slate-900">
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-8 py-5 flex flex-col gap-4 flex-shrink-0 z-10">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-black tracking-tight">User Management</h2>
              <p className="text-slate-500 text-sm mt-1">
                Manage user profiles, roles, and permissions.
              </p>
            </div>
            <button className="bg-[#135bec] hover:bg-[#135bec]/90 text-white px-4 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors shadow-sm">
              <Plus size={20} strokeWidth={2.5} />
              Add New User
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mt-2">
            {/* Search */}
            <div className="relative w-full max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Search size={18} />
              </div>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 border-none rounded-lg bg-slate-100 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-[#135bec] text-sm"
                placeholder="Search by name, email, or ID..."
                type="text"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0 w-full sm:w-auto">
              <Chip active={filter === "ALL"} onClick={() => setFilter("ALL")}>
                All Users
              </Chip>
              <Chip active={filter === "Admin"} onClick={() => setFilter("Admin")}>
                Admins
              </Chip>
              <Chip active={filter === "Manager"} onClick={() => setFilter("Manager")}>
                Managers
              </Chip>
              <Chip active={filter === "Customer"} onClick={() => setFilter("Customer")}>
                Customers
              </Chip>
            </div>
          </div>
        </header>

        {/* Split view */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left panel: table */}
          <div className="flex-1 overflow-auto bg-slate-50 p-6 pr-2">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 text-slate-500">
                  <tr>
                    <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider w-24">
                      User ID
                    </th>
                    <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider hidden md:table-cell">
                      Email
                    </th>
                    <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider hidden lg:table-cell">
                      Role
                    </th>
                    <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider w-32">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {list.map((u) => {
                    const active = u.id === selectedId;
                    return (
                      <tr
                        key={u.id}
                        onClick={() => setSelectedId(u.id)}
                        className={[
                          "cursor-pointer transition-colors border-l-4",
                          active
                            ? "bg-[#135bec]/5 border-l-[#135bec]"
                            : "hover:bg-slate-50 border-l-transparent",
                        ].join(" ")}
                      >
                        <td className="px-6 py-4 text-sm font-medium text-slate-900">
                          #{u.id}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div
                              className="size-8 rounded-full bg-cover bg-center"
                              style={{ backgroundImage: `url('${u.avatar}')` }}
                            />
                            <div className="font-medium text-slate-900">{u.name}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-500 hidden md:table-cell">
                          {u.email}
                        </td>
                        <td className="px-6 py-4 hidden lg:table-cell">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badgeRole(
                              u.role
                            )}`}
                          >
                            {u.role}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${badgeStatus(
                              u.status
                            )}`}
                          >
                            <span
                              className={`size-1.5 rounded-full ${
                                u.status === "Active" ? "bg-green-500" : "bg-slate-400"
                              }`}
                            />
                            {u.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right panel: detail */}
          <div className="w-[450px] flex-shrink-0 bg-white border-l border-slate-200 overflow-y-auto flex flex-col shadow-xl">
            {/* detail header */}
            <div className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-slate-200 p-6 z-10">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                  <div
                    className="size-16 rounded-full bg-cover bg-center ring-2 ring-[#135bec] ring-offset-2 ring-offset-white"
                    style={{ backgroundImage: `url('${selected.avatar}')` }}
                  />
                  <div>
                    <h3 className="text-xl font-bold">{selected.name}</h3>
                    <p className="text-sm text-slate-500">User ID: #{selected.id}</p>
                  </div>
                </div>
                <button className="text-slate-400 hover:text-slate-600">
                  <MoreVertical size={20} />
                </button>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2">
                  <RotateCcw size={16} />
                  Reset Pass
                </button>
                <button className="flex-1 bg-red-50 text-red-600 hover:bg-red-100 py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2">
                  <Ban size={16} />
                  Ban User
                </button>
              </div>
            </div>

            {/* detail content */}
            <div className="p-6 space-y-8">
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                    Profile Details
                  </h4>
                  <button className="text-[#135bec] text-sm font-bold hover:underline">
                    Edit
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">
                      Email Address
                    </label>
                    <p className="text-sm font-medium text-slate-900">{selected.email}</p>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">
                      Phone Number
                    </label>
                    <p className="text-sm font-medium text-slate-900">{selected.phone}</p>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">
                      Role
                    </label>
                    <select
                      className="block w-full rounded-lg border-slate-300 bg-white text-slate-900 py-2 pl-3 pr-8 text-sm focus:border-[#135bec] focus:ring-[#135bec] shadow-sm"
                      defaultValue={selected.role}
                    >
                      <option>Admin</option>
                      <option>Manager</option>
                      <option>Customer</option>
                    </select>
                  </div>
                </div>
              </section>

              <div className="h-px w-full bg-slate-200" />

              <section>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                    Recent Orders
                  </h4>
                  <button className="text-[#135bec] text-sm font-bold hover:underline">
                    View All
                  </button>
                </div>

                <div className="flex flex-col gap-3">
                  <OrderCard id="9921" date="Oct 24, 2023" amount="$120.00" status="Pending" />
                  <OrderCard id="9918" date="Oct 12, 2023" amount="$45.50" status="Shipped" />
                </div>
              </section>

              <div className="h-px w-full bg-slate-200" />

              <section>
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">
                  Active Cart
                </h4>

                <div className="space-y-3">
                  <CartItem icon={Mouse} title="Wireless Optical Mouse" meta="Qty: 2 • $24.00 ea" total="$48.00" />
                  <CartItem icon={Cable} title="HDMI Cable 6ft" meta="Qty: 1 • $12.50 ea" total="$12.50" />
                </div>
              </section>

              <div className="h-px w-full bg-slate-200" />

              <section>
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">
                  Saved Address
                </h4>

                <div className="p-4 rounded-lg border border-slate-200 bg-white relative group">
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-slate-400 hover:text-[#135bec]">
                      <Pencil size={16} />
                    </button>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <Home size={16} className="text-slate-400" />
                    <span className="text-xs font-bold text-[#135bec] uppercase tracking-wide">
                      Default Shipping
                    </span>
                  </div>
                  <p className="text-sm text-slate-900 font-medium">123 Main St, Apt 4B</p>
                  <p className="text-sm text-slate-500">New York, NY 10001</p>
                  <p className="text-sm text-slate-500">United States</p>
                </div>
              </section>

              <div className="pt-4">
                <button className="w-full bg-[#135bec] hover:bg-[#135bec]/90 text-white py-3 rounded-lg font-bold text-sm shadow-md transition-all">
                  Save Changes
                </button>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-colors",
        active
          ? "bg-[#135bec] text-white"
          : "bg-slate-100 text-slate-600 hover:bg-slate-200",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function OrderCard({
  id,
  date,
  amount,
  status,
}: {
  id: string;
  date: string;
  amount: string;
  status: "Pending" | "Shipped";
}) {
  const badge =
    status === "Pending"
      ? "bg-yellow-100 text-yellow-800"
      : "bg-blue-100 text-blue-800";

  return (
    <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between">
      <div className="flex flex-col">
        <span className="text-sm font-bold text-slate-900">Order #{id}</span>
        <span className="text-xs text-slate-500">{date}</span>
      </div>
      <div className="flex flex-col items-end gap-1">
        <span className="text-sm font-bold text-slate-900">{amount}</span>
        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium ${badge}`}>
          {status}
        </span>
      </div>
    </div>
  );
}

function CartItem({
  icon: Icon,
  title,
  meta,
  total,
}: {
  icon: LucideIcon;
  title: string;
  meta: string;
  total: string;
}) {
  return (
    <div className="flex gap-3">
      <div className="size-12 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
        <Icon size={20} className="text-slate-400" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-slate-900 leading-tight">{title}</p>
        <p className="text-xs text-slate-500 mt-1">{meta}</p>
      </div>
      <p className="text-sm font-bold text-slate-900">{total}</p>
    </div>
  );
}