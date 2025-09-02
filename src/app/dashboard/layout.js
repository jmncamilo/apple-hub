"use client";
import styles from "./dashboard.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import UsersIcon from "../../assets/icons/users-icon.svg";
import ProductsIcon from "../../assets/icons/products-icon.svg";
import OrdersIcon from "../../assets/icons/orders-icon.svg";
import RevenuesIcon from "../../assets/icons/revenues-icon.svg";
import LicenceIcon from "../../assets/icons/license-icon.svg";
import ConfigIcon from "../../assets/icons/config-icon.svg";
import LogoutIcon from "../../assets/icons/logout-icon-02.svg";

export default function DashboardLayout({ children }) {

  // Detectando la ruta actual para poner clase css que resalta la ruta actual mediante función flecha
  const pathname = usePathname();
  const isActive = (path) => pathname === path;

    return (
      <div className={styles.mainWrapper}>
        <div className={styles.sidebarMainBox}>
          <div className={styles.iconsBoxAbove}>
            <div className={styles.boxForIcons}>
              <Link className={`${styles.iconsLink} ${isActive('/dashboard/customers') ? styles.isActiveModule : '' }`} href={"/dashboard/customers"}>
                <UsersIcon className={`${styles.icons}`}/>
                <span className={styles.tooltip}>Usuarios</span>
              </Link>
            </div>
            <div className={styles.boxForIcons}>
              <Link className={`${styles.iconsLink} ${isActive('/dashboard/products') ? styles.isActiveModule : '' }`} href={"/dashboard/products"}>
                <ProductsIcon className={`${styles.icons}`}/>
                <span className={styles.tooltip}>Productos</span>
              </Link>
            </div>
            <div className={styles.boxForIcons}>
              <Link className={`${styles.iconsLink} ${isActive('/dashboard/orders') ? styles.isActiveModule : '' }`} href={"/dashboard/orders"}>
                <OrdersIcon className={`${styles.icons}`}/>
                <span className={styles.tooltip}>Pedidos</span>
              </Link>
            </div>
            <div className={styles.boxForIcons}>
              <Link className={`${styles.iconsLink} ${isActive('/dashboard/revenues') ? styles.isActiveModule : '' }`} href={"/dashboard/revenues"}>
                <RevenuesIcon className={`${styles.icons}`}/>
                <span className={styles.tooltip}>Ingresos</span>
              </Link>
            </div>
          </div>
          <div className={styles.iconsBoxBelow}>
            <div className={styles.boxForIcons}>
              <Link className={`${styles.iconsLink} ${isActive('/dashboard/license') ? styles.isActiveModule : '' }`} href={"/dashboard/license"}>
                <LicenceIcon className={`${styles.icons}`}/>
                <span className={styles.tooltip}>Permisos</span>
              </Link>
            </div>
            <div className={styles.boxForIcons}>
              <Link className={`${styles.iconsLink} ${isActive('/dashboard/settings') ? styles.isActiveModule : '' }`} href={"/dashboard/settings"}>
                <ConfigIcon className={`${styles.icons}`}/>
                <span className={styles.tooltip}>Configuración</span>
              </Link>
            </div>
            <div className={styles.boxForIcons}>
              <Link className={`${styles.iconsLink} ${isActive('/dashboard/logout') ? styles.isActiveModule : '' }`} href={"/dashboard/logout"}>
                <LogoutIcon className={`${styles.icons}`}/>
                <span className={styles.tooltip}>Cerrar sesión</span>
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.contentMainBox}>{children}</div>
      </div>
    );
}