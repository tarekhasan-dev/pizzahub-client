
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ChevronDown,
  Menu,
  Pizza,
  Search,
  ShoppingBag,
  User,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import "./Navbar.css";

const links = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/#menu" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar({
  user = { isLoggedIn: false, name: "", role: "customer" },
  totalCartItems = 0,
  onSearchClick = () => {},
  onCartClick = () => {},
  onSignInClick = () => {},
  onLogout = () => {},
}) {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const roleLabel = user.role
    ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
    : "Customer";

  const dashboardHref = `/dashboard/${user.role || "customer"}`;

  const go = (href) => {
    setMobileOpen(false);
    router.push(href);
  };

  return (
    <>
      {/* Main Navbar */}
      <header className="navbar-header">
        <div className="navbar-container">

          {/* Logo */}
          <Link href="/" className="navbar-logo focus-ring">
            <span className="navbar-logo-icon">
              <Pizza size={20} />
            </span>

            <span className="navbar-logo-text">
              <span className="navbar-brand-name">PizzaHub</span>
              <span className="navbar-brand-tagline">
                Wood-fired craft
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="navbar-links">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="navbar-link focus-ring"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Navbar Actions */}
          <div className="navbar-actions">

            {/* Search */}
            <button
              type="button"
              onClick={onSearchClick}
              aria-label="Search pizzas"
              className="navbar-icon-button focus-ring"
            >
              <Search size={20} />
            </button>

            {/* Cart */}
            <button
              type="button"
              onClick={onCartClick}
              aria-label={`Open cart, ${totalCartItems} items`}
              className="navbar-icon-button navbar-cart-button focus-ring"
            >
              <ShoppingBag size={20} />

              {totalCartItems > 0 && (
                <motion.span
                  key={totalCartItems}
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 14,
                  }}
                  className="navbar-cart-badge"
                >
                  {totalCartItems}
                </motion.span>
              )}
            </button>

            {/* Desktop Profile / Sign In */}
            <div className="navbar-desktop-auth">
              {user.isLoggedIn ? (
                <DropdownMenu>
                  <DropdownMenuTrigger className="navbar-profile-trigger focus-ring">
                    <User size={16} />
                    {user.name}
                    <ChevronDown size={14} />
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    align="end"
                    className="navbar-dropdown-content"
                  >
                    <DropdownMenuItem
                      onClick={() => go(dashboardHref)}
                    >
                      My Dashboard ({roleLabel})
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={() => go("/profile")}
                    >
                      My Profile
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={() => go("/orders")}
                    >
                      My Orders
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={() => go("/settings")}
                    >
                      Settings
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                      onClick={onLogout}
                      className="navbar-logout-item"
                    >
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <button
                  type="button"
                  onClick={onSignInClick}
                  className="navbar-signin-button focus-ring"
                >
                  Sign In
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="navbar-menu-button focus-ring"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-over Menu */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent
          side="right"
          className="navbar-sheet-content"
        >
          <SheetHeader>
            <SheetTitle className="navbar-sheet-title">
              PizzaHub
            </SheetTitle>
          </SheetHeader>

          <nav className="navbar-mobile-links">
            {links.map((link) => (
              <button
                key={link.label}
                type="button"
                onClick={() => go(link.href)}
                className="navbar-mobile-link"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="navbar-mobile-auth">
            {user.isLoggedIn ? (
              <>
                <button
                  type="button"
                  onClick={() => go(dashboardHref)}
                  className="navbar-mobile-dashboard"
                >
                  {roleLabel} Dashboard
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    onLogout();
                  }}
                  className="navbar-mobile-logout"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  onSignInClick();
                }}
                className="navbar-mobile-signin"
              >
                Sign In
              </button>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
