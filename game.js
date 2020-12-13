const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
    state = {}
    showTextNode(1)
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0) {
        return startGame()
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}

const textNodes = [{
        id: 1,
        text: '"Relizer : Pengulangan "\n \n Text-Adventure Games',
        options: [{
                text: 'Mulai',
                nextText: 2
            },
            {
                text: 'Tentang',
                nextText: 21
            }
        ]
    },
    {
        id: 2,
        text: 'Perlahan mataku mulai terbuka, kulihat atap ruangan yang berwana putih dan kain gorden yang mengelilingiku. Aku sadar bawahwa aku sekarang berada diruang uks. Namun aku masih tidak ingat apa yang terjadi . saat aku hendak berdiri meninggalkan ruangan ini, tiba – tiba secarik kertas jatuh dari kantong celanaku .',
        options: [{
                text: 'Aku mengambil kertas tersebut ',
                nextText: 3
            },
            {
                text: 'Karna terlihat lusuh, kebiarkan kertas itu dan pergi meninggalkan ruangan ini. ',
                nextText: 4
            }
        ]
    },
    {
        id: 3,
        text: 'Ketika kubuka , hanya ada terdapat angka bertuliskan 1709, aku tak tau apa yang dimaksut aku pun menyimpanya dan meninggalkan ruangan.',
        options: [{
                text: '..................',
                setState: { kertas: true },
                nextText: 4
            },
            {
                text: 'namun aku merasa ada yang salah, kulihat kembali ternyata nilainya berubah menjadi 1710, seakan bertambah satu',
                setState: { final: true },
                requiredState: (currentState) => currentState.mulai,
                requiredState: (currentState) => currentState.mati1,
                requiredState: (currentState) => currentState.mati2,
                requiredState: (currentState) => currentState.mati3,
                nextText: 4
            }
        ]
    },
    {
        id: 4,
        text: '“Hei…….. Kemana saja kau ?” teriak seseorang yang berlari kearahku. Dia berlari sambil senyam-senyum seperti anak kecil yang baru mendapatkan hadiah ulang tahun.  Namanya adalah rey, dia sedikit terkenal karena sifatnya yang playboy \n “Kawan, coba tebak apa yang baru aku dapatkan ? “ .',
        options: [{
                text: '“Kau baru saja mendapatkan pinjaman uang ?” ',
                nextText: 5
            },
            {
                text: '“Kau mendapatkan gadis lain yang dapat kau permainkan ?” ',
                nextText: 6
            },
            {
                text: '“Dari pada itu, kau tau ini kertas apa ? ” ',
                requiredState: (currentState) => currentState.kertas,
                nextText: 5
            },
            {
                text: '“Kurasa ada yang aneh” ',
                requiredState: (currentState) => currentState.lihatElina,
                nextText: 5
            },
            {
                text: '“Elina dalam bahaya, cepat pergi ke toilet” teriakku kepadanya. ',
                requiredState: (currentState) => currentState.final,
                nextText: 18
            }
        ]
    },
    {
        id: 5,
        text: '“Ayolah siapa peduli dengan itu  !!!“  \n “Lau apa yang kau dapatkan ?” tanyaku balik padanya. \n “Aku baru saja mendaptkan surat cinta dari elina. kau tau kan elina gadis tercantik paling populer yang ada disekolah ini “ ',
        options: [{
                text: '“Sudah cukup berkayalnya ? “',
                nextText: 7
            },
            {
                text: '“Kau yakin itu benar dari dia ?”',
                nextText: 7
            }
        ]
    },
    {
        id: 6,
        text: '“Kali ini spesial, Aku baru saja mendaptkan surat cinta dari elina. kau tau kan elina gadis tercantik paling populer yang ada disekolah ini “',
        options: [{
                text: '“Sudah cukup berkayalnya ? “',
                nextText: 7
            },
            {
                text: '“Kau yakin itu benar dari dia ?”',
                nextText: 7
            }
        ]
    },
    {
        id: 7,
        text: '“Kalau kau tidak percaya bagaimana kalau kau ikut denganku untuk membuktikanya “ sahut rey dengan wajah percaya diri.  ',
        options: [{
                text: '“Aku tidak peduli, lebih baik aku pergi ke kantin”',
                nextText: 8
            },
            {
                text: '“Aku tidak peduli, aku mau pergi ke toilet” ',
                nextText: 12
            },
            {
                text: '"Aku tak Peduli , Lebih baik aku kembali kekelas”.',
                nextText: 10
            },
            {
                text: '"Kurasa aku memang harus ikut denganmu”.',
                requiredState: (currentState) => currentState.pre,
                nextText: 17
            }
        ]
    },
    {
        id: 8,
        text: 'Akupun pergi ke kantin untuk memesan beberapa makanan, saat berjalan menuju meja aku ditabrak oleh sorang siswa yang tak kukenal. dia terlihat buru-buru dan pergi kearah ruangan karyawan kantin. tak terasa setelah 30 menit berlalu bel masuk berbunyi. Sebelum kembali kekelas , aku pergi membayar makananku terlebih dahulu.',
        options: [{
                text: 'Karena ibu kantin tidak ada, aku menaruh uang tersebut diatas meja dan pergi kembali kekelas.',
                nextText: 9
            },
            {
                text: 'Karena ibu kantin tidak ada, aku menaruh uang tersebut diatas meja. Sebelum aku pergi kekelas, aku mencari rey terlebih dahulu untuk memberitahukan sesuatu.',
                requiredState: (currentState) => currentState.lihatElina,
                nextText: 15
            },
            {
                text: 'Karena ibu kantin tidak ada, aku mencoba mengeceknya kedalam rung pegawai karena merasa tidak sopan kalau pergi begitu saja.',
                nextText: 11
            }
        ]
    },
    {
        id: 9,
        text: 'Akupun kembali kekelas untuk mengikuti pelajaran, perlahan aku mulau mengantuk dan kesadarankupun menghilang.',
        options: [{
                text: '.............',
                setState: { mati1: false, mati2: false, mati3: false },
                nextText: 2
            },
            {
                text: 'Keluar',
                setState: { mati1: false, mati2: false, mati3: false },
                nextText: 1
            }
        ]
    },
    {
        id: 10,
        text: 'Akupun kembali kekelas dan istirahat dimejaku sejenak, setelah 30 menit jam pelajaranpun dimulai. Saat berniat mengambil bukuku dilaci kulihat secarik kertas disana. Kertas itu bertuliskan “selesaikan semua”. Karena tidak tau apa yang dimaksut ketas tersebut, aku memilih kembali fokus kepelajaran. Perlahan aku mulai mengantuk dan kesadaranku menghilang.',
        options: [{
            text: '.........',
            setState: { mulai: true },
            nextText: 2
        }]
    },
    {
        id: 11,
        text: 'Aku pergi keruangan tesebut, tidak ada siapa-siapa diasana. Namun aku mencium sesuatu seperti bau amis. Kulihat dibawah ada genangan air berwarna merah yang keluar dari balik pintu. Saat kulihat dibalik pintu tersebut terdapat jasat ibu kantin yang sudah kaku. Tiba-tiba aku merasa sesuatu menembus dari balik punggungku, tubuhku terasa panas. Kulihat bajuku mulai bewarna merah. Perlahan kesadaranku menghilang.',
        options: [{
            text: '.............',
            setState: { mati1: true },
            nextText: 2
        }]
    },
    {
        id: 12,
        text: 'Akupun pergi ketoilet, saat sampai disana kulihat elina masuk ketoilet perempuan yang tepat berada disebelah toilet laki-laki. Sudah kuduga kalau surat yang diterima rey adalah palsu, mana mungkin elina mau dengan playboy macam dia. Setelah selesai dengan semua anganku akupun masuk ketoilet.  Namun sesaat aku merasa harus memberi tau rey bahwa surat itu palsu.',
        options: [{
                text: 'Namun karena sifat rey yang seperti itu, kurasa dia memang sesekali harus diberi pelajaran.',
                nextText: 13
            },
            {
                text: 'Akupun pergi mencarinya sekalian untuk mengejek kepercayaan dirinya.',
                nextText: 14
            }
        ]
    },
    {
        id: 13,
        text: 'Setelah selesai dari toilet akupun pergi kekelas',
        options: [{
            text: '.............',
            nextText: 9
        }]
    },
    {
        id: 14,
        text: '“Hey apa yang kau lakukan !!! “ teriakku pada seorang laki-laki yang baru saja keluar dari toilet perempuan, dia terlihat ketakutan dan langsung berlari menuju kearah kantin. Aku berniat mengejarnya. Namun niatku runtuk saat kulihat sosok elina tergeletak di toilet dan bersimbah darah. Aku perlari menujunya. Kulihat luka tusukan diperut dan didada. Namun kenapa dia tidaak berteriak. Kulihat sebuah sapu tangan disampingnya, ketika kuambil tiba-tiba tercium bau menyengat yang membuat kesadaranku langsung menghilang.',
        options: [{
            text: '.............',
            setState: { mati2: true, lihatElina: true, },
            nextText: 2
        }]
    },
    {
        id: 15,
        text: 'aku pergi mencari rey, seingatku dia bilang bahawa dia akan bertemu dengan elina di gedung lama, akupun pergi kesana. Setelah sampai disana tidak ada siapa-siapa. Aku rasa dia telah kembali kekelas. Akupun memutuskan untuk kembali kekelas juga. ',
        options: [{
            text: '.............',
            setState: { pre: true },
            nextText: 16
        }]
    },
    {
        id: 16,
        text: 'Akupun kembali kekelas untuk mengikuti pelajaran, perlahan aku mulau mengantuk dan kesadarankupun menghilang.',
        options: [{
            text: '.............',
            setState: { pre: true },
            nextText: 2
        }]
    },
    {
        id: 16,
        text: 'Akupun kembali kekelas untuk mengikuti pelajaran, perlahan aku mulau mengantuk dan kesadarankupun menghilang.',
        options: [{
                text: '.............',
                setState: { pre: true },
                nextText: 2
            },
            {
                text: 'Keluar',
                setState: { mati1: false, mati2: false, mati3: false },
                nextText: 1
            }
        ]
    },
    {
        id: 17,
        text: 'Kamipun memutuskan pergi kegedung sekolah, disana elina tidak ada. Tiba-tiba sesuatu menghantam belakang kepalaku dan aku mulai terjatuh. Kesadaranku setengah hilang hinga aku tidak mampu bediri dan hanya bisa melihat. Kulihat rey dikeroyok oleh beberapa siswa, dia berusaha melawan. Namun salah satu dari siswa tersebut menusuknya dengan pisau lalu kepalanya dipukul hingga dia pingsan. Mereka tertawa puas. Sesaat aku seperti mendengar mereka berbicara \n “akhirnya kita bisa menghabisi banjingan yang merebut gadis kita.”',
        options: [{
            text: '.............',
            setState: { mati3: true },
            nextText: 2
        }]
    },
    {
        id: 18,
        text: '“Apa maksutmu ?” tanya rey kepadaku dengan wajah terheran-heran.',
        options: [{
                text: '“Aku tidak ingat, tapi kurasa kita harus pergi ketoilet”',
                nextText: 19
            },
            {
                text: 'Entahlah lupakan saja, kurasa aku mau pergi kekelas saja',
                nextText: 9
            }
        ]
    },
    {
        id: 19,
        text: 'Akupun berlari menuju tolitet, rey yang sebelumnya terheran-heran mulai berlari mengejarku. Saat berhenti disana kulihat seorang laki-laki masuk ketoilet perempuan. Melihat kejadian itu aku dan rey sontak merasa marah dan berlali masuk kedalam. disana terlihat elina yang sudah pingsan kerena didekap dengan sebuah sapu tangan. Melihat itu rey langsung melompat dan menghantam kepala laki-laki tersebut dengan keras hingga pingsan dalam satu pukulan. ',
        options: [{
            text: 'Aku pergi kekantor kepala sekolah untuk melaporkan kejadian itu.',
            nextText: 20
        }]
    },
    {
        id: 20,
        text: 'Tak beberapa lama guru-guru datang untuk membawa siswa tersebut. Diketahui bawahwa siswa tersebut membawa obat bius dan sebuah pisau dicelananya. Tak ada yang mengetahui motifnya. Namun karena kejadian itu seluruh kepala sekolah memutuskan untuk melakukan razia senjata tajam hari itu juga. Terdapat 3 orang lain yang terkena razia saat mereka berada dibelakang sekolah.  Kejadian itu membuat seluruh sekolah panik sehingga pihak sekolah memutuskan untuk memulangkan seluruh murit.',
        options: [{
            text: 'Selesai',
            nextText: -1
        }]
    },
    {
        id: 21,
        text: 'Games ini dibuat untuk memenuhi matakuliah analisis dan desain algoritma \n Dibuat oleh : M. Aris Firmansyah (180535632537), M. Busthomi Arviansyah (180535632580)',
        options: [{
            text: 'Kembali',
            nextText: -1
        }]
    }
]

startGame()