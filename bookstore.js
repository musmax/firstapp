const books = [
    {
        id : 1,
        bookTitle:'All that shines isn\'t glamour',
        bookCover: 'Black diamond',
        ISBN: '123-234',
        Year: '2004',
        author: 'Musa Ojo'
    },
    {
        id : 2,
        bookTitle:'Lions king',
        bookCover: 'Lion Icon',
        ISBN: '123-654',
        Year: '2005',
        author: 'wole soyinka'
    },
    {
        id : 3,
        bookTitle:'Purple Hibiscus',
        bookCover: 'flower cartoon',
        ISBN: '123-123',
        Year: '2005',
        author: 'chimanmanda'
    },
    {
        id : 4,
        bookTitle:'Tribesmen',
        bookCover: 'black symbols',
        ISBN: '123-222',
        Year: '2008',
        author: 'Kenny Onifade'
    }
];

const author = [
   {
    name:'wole soyinka',
    id:1,
    country:'Nigeria'
   },

   {
    name:'Paul Gambit',
    id:2,
    country:'USA'
   },
   {
    name:'Late Chinua achebe',
    id:3,
    country:'Nigeria'
   },
   {
    name:'Koffi anan',
    id:4,
    country:'Ghana'
   },
];

module.exports =  {
    books,
    author
};

