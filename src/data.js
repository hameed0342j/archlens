export const packageData = {
  'System Core': {
    description: 'Fundamental system components and utilities',
    packages: [
      {
        name: 'linux',
        shortDesc: 'The Linux kernel - the core of your operating system',
        officialDesc: 'The Linux kernel and modules',
        reason: 'Explicitly installed',
        dependencies: ['coreutils', 'kmod', 'mkinitcpio'],
        optDeps: ['firmware packages for hardware support'],
        wikiLink: 'https://wiki.archlinux.org/title/Kernel'
      },
      {
        name: 'systemd',
        shortDesc: 'System and service manager that starts and manages all other processes',
        officialDesc: 'System and service manager',
        reason: 'Explicitly installed',
        dependencies: ['util-linux', 'libseccomp', 'dbus'],
        optDeps: ['polkit: privilege control', 'quota-tools: quota support'],
        wikiLink: 'https://wiki.archlinux.org/title/Systemd'
      },
      {
        name: 'base',
        shortDesc: 'Minimal package set to define a basic Arch Linux installation',
        officialDesc: 'Minimal package set to define a basic Arch Linux installation',
        reason: 'Explicitly installed',
        dependencies: ['bash', 'coreutils', 'filesystem', 'glibc', 'systemd'],
        optDeps: [],
        wikiLink: 'https://wiki.archlinux.org/title/Installation_guide'
      },
      {
        name: 'grub',
        shortDesc: 'Boot loader that starts your operating system',
        officialDesc: 'GNU GRand Unified Bootloader',
        reason: 'Explicitly installed',
        dependencies: ['gettext', 'device-mapper'],
        optDeps: ['os-prober: detect other operating systems'],
        wikiLink: 'https://wiki.archlinux.org/title/GRUB'
      }
    ]
  },
  'Display & Graphics': {
    description: 'Graphics drivers, display servers, and rendering systems',
    packages: [
      {
        name: 'xorg-server',
        shortDesc: 'The X Window System - allows graphical applications to display',
        officialDesc: 'Xorg X server',
        reason: 'Explicitly installed',
        dependencies: ['libxfont2', 'pixman', 'xorg-server-common'],
        optDeps: ['xf86-input-libinput: input device support'],
        wikiLink: 'https://wiki.archlinux.org/title/Xorg'
      },
      {
        name: 'mesa',
        shortDesc: 'Open-source graphics drivers for AMD, Intel, and other GPUs',
        officialDesc: 'Open-source OpenGL and Vulkan drivers',
        reason: 'Installed as dependency',
        dependencies: ['libdrm', 'wayland', 'libx11'],
        optDeps: ['opengl-man-pages: documentation'],
        wikiLink: 'https://wiki.archlinux.org/title/Mesa'
      },
      {
        name: 'xf86-input-libinput',
        shortDesc: 'Generic input driver - handles mouse, keyboard, and touchpad input',
        officialDesc: 'Generic input driver for the X.Org server based on libinput',
        reason: 'Explicitly installed',
        dependencies: ['libinput', 'xorg-server'],
        optDeps: [],
        wikiLink: 'https://wiki.archlinux.org/title/Libinput'
      },
      {
        name: 'nvidia-utils',
        shortDesc: 'NVIDIA graphics card utilities and drivers',
        officialDesc: 'NVIDIA drivers utilities',
        reason: 'Explicitly installed',
        dependencies: ['libglvnd', 'egl-wayland'],
        optDeps: [],
        wikiLink: 'https://wiki.archlinux.org/title/NVIDIA'
      }
    ]
  },
  'Networking': {
    description: 'Network connectivity, management, and security tools',
    packages: [
      {
        name: 'networkmanager',
        shortDesc: 'Automatically manages network connections (Wi-Fi, Ethernet, VPN)',
        officialDesc: 'Network connection manager and user applications',
        reason: 'Explicitly installed',
        dependencies: ['dbus', 'iproute2', 'libnm', 'wpa_supplicant'],
        optDeps: ['dnsmasq: connection sharing', 'openvpn: VPN support'],
        wikiLink: 'https://wiki.archlinux.org/title/NetworkManager'
      },
      {
        name: 'wpa_supplicant',
        shortDesc: 'Handles WPA/WPA2 Wi-Fi authentication',
        officialDesc: 'A utility providing key negotiation for WPA wireless networks',
        reason: 'Installed as dependency',
        dependencies: ['openssl', 'libdbus'],
        optDeps: ['qt5-base: GUI support'],
        wikiLink: 'https://wiki.archlinux.org/title/Wpa_supplicant'
      },
      {
        name: 'bluez',
        shortDesc: 'Bluetooth protocol stack and framework',
        officialDesc: 'Bluetooth protocol stack for Linux',
        reason: 'Explicitly installed',
        dependencies: ['dbus', 'glibc'],
        optDeps: ['cups: for printing support'],
        wikiLink: 'https://wiki.archlinux.org/title/Bluetooth'
      },
      {
        name: 'bluez-utils',
        shortDesc: 'Bluetooth management utilities including bluetoothctl',
        officialDesc: 'Development and debugging utilities for the bluetooth protocol stack',
        reason: 'Explicitly installed',
        dependencies: ['bluez', 'glib2'],
        optDeps: [],
        wikiLink: 'https://wiki.archlinux.org/title/Bluetooth'
      }
    ]
  },
  'Audio Subsystem': {
    description: 'Sound servers, mixers, and audio framework components',
    packages: [
      {
        name: 'pipewire',
        shortDesc: 'Modern audio/video server - handles all sound on your system',
        officialDesc: 'Low-latency audio/video router and processor',
        reason: 'Explicitly installed',
        dependencies: ['libpipewire', 'rtkit', 'systemd'],
        optDeps: ['wireplumber: session manager', 'pipewire-pulse: PulseAudio replacement'],
        wikiLink: 'https://wiki.archlinux.org/title/PipeWire'
      },
      {
        name: 'alsa-utils',
        shortDesc: 'Command-line utilities for managing sound cards and volume',
        officialDesc: 'Advanced Linux Sound Architecture - Utilities',
        reason: 'Explicitly installed',
        dependencies: ['alsa-lib', 'pciutils'],
        optDeps: [],
        wikiLink: 'https://wiki.archlinux.org/title/Advanced_Linux_Sound_Architecture'
      },
      {
        name: 'wireplumber',
        shortDesc: 'Session and policy manager for PipeWire',
        officialDesc: 'Session / policy manager implementation for PipeWire',
        reason: 'Explicitly installed',
        dependencies: ['pipewire', 'lua'],
        optDeps: [],
        wikiLink: 'https://wiki.archlinux.org/title/PipeWire'
      },
      {
        name: 'pavucontrol',
        shortDesc: 'Volume control GUI for managing audio devices',
        officialDesc: 'PulseAudio Volume Control',
        reason: 'Explicitly installed',
        dependencies: ['libpulse', 'gtkmm3'],
        optDeps: [],
        wikiLink: 'https://wiki.archlinux.org/title/PulseAudio'
      }
    ]
  },
  'Desktop Environment': {
    description: 'Complete desktop interfaces and their core components',
    packages: [
      {
        name: 'plasma-desktop',
        shortDesc: 'The KDE Plasma desktop workspace - your graphical environment',
        officialDesc: 'KDE Plasma Desktop',
        reason: 'Explicitly installed',
        dependencies: ['kwin', 'systemsettings', 'plasma-workspace'],
        optDeps: ['powerdevil: power management'],
        wikiLink: 'https://wiki.archlinux.org/title/KDE'
      },
      {
        name: 'gnome-shell',
        shortDesc: 'The main GNOME desktop interface you see and interact with',
        officialDesc: 'Next generation desktop shell',
        reason: 'Explicitly installed',
        dependencies: ['gnome-session', 'mutter', 'gjs'],
        optDeps: ['gnome-control-center: system settings'],
        wikiLink: 'https://wiki.archlinux.org/title/GNOME'
      },
      {
        name: 'sddm',
        shortDesc: 'Display manager - the login screen you see when you boot',
        officialDesc: 'Simple Desktop Display Manager',
        reason: 'Explicitly installed',
        dependencies: ['qt6-base', 'libxcb'],
        optDeps: [],
        wikiLink: 'https://wiki.archlinux.org/title/SDDM'
      }
    ]
  },
  'Virtualization': {
    description: 'Virtual machine and container platforms',
    packages: [
      {
        name: 'qemu-base',
        shortDesc: 'Core QEMU emulator for running virtual machines',
        officialDesc: 'A basic QEMU setup for most virtualization needs',
        reason: 'Explicitly installed',
        dependencies: ['glibc', 'pixman', 'glib2'],
        optDeps: ['qemu-audio-alsa: audio support'],
        wikiLink: 'https://wiki.archlinux.org/title/QEMU'
      },
      {
        name: 'virtualbox',
        shortDesc: 'Desktop virtualization platform by Oracle',
        officialDesc: 'Powerful x86 virtualization for enterprise and home use',
        reason: 'Explicitly installed',
        dependencies: ['glibc', 'libxml2'],
        optDeps: ['virtualbox-guest-iso: guest additions'],
        wikiLink: 'https://wiki.archlinux.org/title/VirtualBox'
      },
      {
        name: 'docker',
        shortDesc: 'Container platform for application deployment',
        officialDesc: 'Pack, ship and run any application as a lightweight container',
        reason: 'Explicitly installed',
        dependencies: ['containerd', 'runc'],
        optDeps: [],
        wikiLink: 'https://wiki.archlinux.org/title/Docker'
      }
    ]
  },
  'Development': {
    description: 'Compilers, interpreters, build tools, and development libraries',
    packages: [
      {
        name: 'gcc',
        shortDesc: 'The GNU C/C++ compiler - compiles code into programs',
        officialDesc: 'The GNU Compiler Collection - C and C++ frontends',
        reason: 'Explicitly installed',
        dependencies: ['binutils', 'glibc', 'libmpc'],
        optDeps: [],
        wikiLink: 'https://wiki.archlinux.org/title/GNU_Compiler_Collection'
      },
      {
        name: 'python',
        shortDesc: 'Python programming language interpreter',
        officialDesc: 'The Python programming language',
        reason: 'Installed as dependency',
        dependencies: ['bzip2', 'expat', 'gdbm', 'openssl'],
        optDeps: ['python-pip: package installer'],
        wikiLink: 'https://wiki.archlinux.org/title/Python'
      },
      {
        name: 'git',
        shortDesc: 'Version control system for tracking code changes',
        officialDesc: 'Fast distributed version control system',
        reason: 'Explicitly installed',
        dependencies: ['curl', 'expat', 'perl'],
        optDeps: [],
        wikiLink: 'https://wiki.archlinux.org/title/Git'
      },
      {
        name: 'nodejs',
        shortDesc: 'JavaScript runtime built on Chrome V8 engine',
        officialDesc: 'Evented I/O for V8 javascript',
        reason: 'Explicitly installed',
        dependencies: ['openssl', 'zlib', 'icu'],
        optDeps: ['npm: node package manager'],
        wikiLink: 'https://wiki.archlinux.org/title/Node.js'
      }
    ]
  },
  'Fonts & Icons': {
    description: 'Font families and icon sets',
    packages: [
      {
        name: 'ttf-firacode-nerd',
        shortDesc: 'Nerd Fonts patched FiraCode with programming icons',
        officialDesc: 'Patched font FiraCode from nerd fonts library',
        reason: 'Explicitly installed',
        dependencies: [],
        optDeps: [],
        wikiLink: 'https://www.nerdfonts.com/'
      },
      {
        name: 'noto-fonts',
        shortDesc: 'Google Noto fonts for comprehensive Unicode coverage',
        officialDesc: 'Google Noto TTF fonts',
        reason: 'Explicitly installed',
        dependencies: [],
        optDeps: [],
        wikiLink: 'https://wiki.archlinux.org/title/Fonts'
      },
      {
        name: 'fontconfig',
        shortDesc: 'Library for configuring and customizing font access',
        officialDesc: 'Library for configuring fonts',
        reason: 'Explicitly installed',
        dependencies: ['expat', 'freetype2'],
        optDeps: [],
        wikiLink: 'https://wiki.archlinux.org/title/Font_configuration'
      }
    ]
  }
};

export const diagnosticRules = {
  'bluetooth': {
    keywords: ['bluetooth', 'bt', 'headphone', 'headset', 'wireless audio'],
    packages: ['bluez', 'bluez-utils', 'pipewire'],
    commands: {
      'bluez': 'systemctl status bluetooth',
      'bluez-utils': 'bluetoothctl devices',
      'pipewire': 'systemctl --user status pipewire'
    }
  },
  'audio': {
    keywords: ['audio', 'sound', 'speaker', 'music', 'no sound'],
    packages: ['pipewire', 'wireplumber', 'alsa-utils', 'pavucontrol'],
    commands: {
      'pipewire': 'systemctl --user restart pipewire',
      'wireplumber': 'systemctl --user status wireplumber',
      'alsa-utils': 'alsamixer',
      'pavucontrol': 'pavucontrol'
    }
  },
  'wifi': {
    keywords: ['wifi', 'wireless', 'network', 'internet', 'connection'],
    packages: ['networkmanager', 'wpa_supplicant'],
    commands: {
      'networkmanager': 'systemctl status NetworkManager',
      'wpa_supplicant': 'systemctl status wpa_supplicant'
    }
  },
  'graphics': {
    keywords: ['graphics', 'display', 'screen', 'gpu', 'video', 'monitor'],
    packages: ['mesa', 'xorg-server', 'nvidia-utils'],
    commands: {
      'mesa': 'glxinfo | grep "OpenGL renderer"',
      'xorg-server': 'journalctl -u display-manager -n 50',
      'nvidia-utils': 'nvidia-smi'
    }
  },
  'vm': {
    keywords: ['virtual machine', 'vm', 'virtualization', 'qemu', 'virtualbox'],
    packages: ['qemu-base', 'virtualbox', 'docker'],
    commands: {
      'qemu-base': 'lsmod | grep kvm',
      'virtualbox': 'systemctl status vboxdrv',
      'docker': 'systemctl status docker'
    }
  },
  'fonts': {
    keywords: ['font', 'text', 'icon', 'symbol', 'terminal font'],
    packages: ['ttf-firacode-nerd', 'noto-fonts', 'fontconfig'],
    commands: {
      'ttf-firacode-nerd': 'fc-list | grep -i firacode',
      'fontconfig': 'fc-cache -fv',
      'noto-fonts': 'fc-list | grep -i noto'
    }
  }
};