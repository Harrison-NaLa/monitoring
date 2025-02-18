import NextAuth, { Session } from 'next-auth';
import { Provider } from 'next-auth/providers';
import spotify from 'next-auth/providers/spotify';
import {JWT} from '@auth/core/jwt';

export interface ESession extends Session {
    accessToken?: string;
}

export interface EJWT extends JWT {
    accessToken?: string;
}

const providers: Provider[] = [
    spotify({
        clientId: process.env.AUTH_SPOTIFY_ID,
        clientSecret: process.env.AUTH_SPOTIFY_SECRET,
        authorization: {
            url: "https://accounts.spotify.com/authorize",
            params: { scope: "user-top-read, user-library-read" }
        }
    })
]

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers,
    callbacks: {
        jwt: async ({ token, account }) => {
            if (account?.provider === "spotify") {
                return { ...token, accessToken: account.access_token }
            }
            return token
        },
        async session({ session, token }: { session: ESession, token: EJWT }) {
            session.accessToken = token.accessToken
            return session
        }
    }
});

/*
export interface MockInterface {
    album_type: string;
    available_markets: string;
    artists: ArtistInterface[];
}

export const mockData: MockInterface[] = [
    {
        "album_type": "Mr",
        "artists": [
            {
                "external_urls": {
                    "spotify": "http://wikipedia.org/aenean/sit/amet/justo/morbi/ut/odio.js?purus=sem&phasellus=fusce&in=consequat&felis=nulla&donec=nisl&semper=nunc&sapien=nisl&a=duis&libero=bibendum&nam=felis&dui=sed&proin=interdum&leo=venenatis&odio=turpis&porttitor=enim&id=blandit&consequat=mi&in=in&consequat=porttitor&ut=pede&nulla=justo&sed=eu&accumsan=massa&felis=donec&ut=dapibus&at=duis&dolor=at&quis=velit&odio=eu&consequat=est&varius=congue&integer=elementum&ac=in&leo=hac&pellentesque=habitasse&ultrices=platea&mattis=dictumst&odio=morbi&donec=vestibulum&vitae=velit&nisi=id&nam=pretium&ultrices=iaculis&libero=diam&non=erat&mattis=fermentum&pulvinar=justo&nulla=nec&pede=condimentum&ullamcorper=neque&augue=sapien&a=placerat&suscipit=ante&nulla=nulla&elit=justo&ac=aliquam&nulla=quis&sed=turpis&vel=eget&enim=elit&sit=sodales&amet=scelerisque&nunc=mauris&viverra=sit&dapibus=amet&nulla=eros&suscipit=suspendisse&ligula=accumsan&in=tortor&lacus=quis&curabitur=turpis&at=sed&ipsum=ante&ac=vivamus&tellus=tortor&semper=duis&interdum=mattis&mauris=egestas&ullamcorper=metus&purus=aenean&sit=fermentum&amet=donec&nulla=ut&quisque=mauris&arcu=eget&libero=massa&rutrum=tempor&ac=convallis&lobortis=nulla&vel=neque&dapibus=libero&at=convallis&diam=eget&nam=eleifend&tristique=luctus&tortor=ultricies&eu=eu&pede=nibh"
                },
                "href": "https://opensource.org/turpis/eget/elit.js?nunc=nec&donec=condimentum&quis=neque&orci=sapien&eget=placerat&orci=ante&vehicula=nulla&condimentum=justo&curabitur=aliquam&in=quis&libero=turpis&ut=eget&massa=elit&volutpat=sodales&convallis=scelerisque&morbi=mauris",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Mélissandre",
                "type": "artist",
                "uri": "https://last.fm/consequat/metus/sapien/ut/nunc/vestibulum.jsp?sed=fusce&lacus=congue&morbi=diam&sem=id&mauris=ornare&laoreet=imperdiet&ut=sapien&rhoncus=urna&aliquet=pretium&pulvinar=nisl&sed=ut&nisl=volutpat&nunc=sapien&rhoncus=arcu&dui=sed&vel=augue&sem=aliquam&sed=erat&sagittis=volutpat&nam=in&congue=congue&risus=etiam&semper=justo&porta=etiam&volutpat=pretium&quam=iaculis&pede=justo&lobortis=in&ligula=hac&sit=habitasse&amet=platea&eleifend=dictumst&pede=etiam&libero=faucibus&quis=cursus&orci=urna&nullam=ut&molestie=tellus&nibh=nulla&in=ut&lectus=erat&pellentesque=id&at=mauris&nulla=vulputate&suspendisse=elementum&potenti=nullam&cras=varius&in=nulla&purus=facilisi&eu=cras&magna=non&vulputate=velit&luctus=nec&cum=nisi&sociis=vulputate&natoque=nonummy&penatibus=maecenas&et=tincidunt&magnis=lacus&dis=at&parturient=velit&montes=vivamus&nascetur=vel&ridiculus=nulla&mus=eget&vivamus=eros&vestibulum=elementum&sagittis=pellentesque"
            }
        ],
        "available_markets": "FR"
    }, {
        "album_type": "Rev",
        "artists": [
            {
                "external_urls": {
                    "spotify": "http://nationalgeographic.com/urna/ut/tellus.png?in=varius&hac=nulla&habitasse=facilisi&platea=cras&dictumst=non&etiam=velit&faucibus=nec&cursus=nisi&urna=vulputate&ut=nonummy&tellus=maecenas&nulla=tincidunt&ut=lacus&erat=at&id=velit&mauris=vivamus&vulputate=vel&elementum=nulla&nullam=eget&varius=eros&nulla=elementum&facilisi=pellentesque&cras=quisque&non=porta&velit=volutpat&nec=erat&nisi=quisque&vulputate=erat&nonummy=eros&maecenas=viverra&tincidunt=eget&lacus=congue&at=eget&velit=semper&vivamus=rutrum&vel=nulla&nulla=nunc&eget=purus&eros=phasellus&elementum=in&pellentesque=felis&quisque=donec&porta=semper&volutpat=sapien&erat=a&quisque=libero&erat=nam&eros=dui&viverra=proin"
                },
                "href": "http://seattletimes.com/curabitur/at/ipsum/ac/tellus/semper/interdum.png?suspendisse=diam&accumsan=id&tortor=ornare&quis=imperdiet&turpis=sapien&sed=urna&ante=pretium&vivamus=nisl&tortor=ut&duis=volutpat&mattis=sapien&egestas=arcu&metus=sed&aenean=augue&fermentum=aliquam&donec=erat&ut=volutpat&mauris=in&eget=congue&massa=etiam&tempor=justo&convallis=etiam&nulla=pretium&neque=iaculis&libero=justo&convallis=in&eget=hac&eleifend=habitasse&luctus=platea&ultricies=dictumst&eu=etiam&nibh=faucibus&quisque=cursus&id=urna&justo=ut&sit=tellus&amet=nulla&sapien=ut&dignissim=erat&vestibulum=id&vestibulum=mauris&ante=vulputate&ipsum=elementum&primis=nullam&in=varius&faucibus=nulla&orci=facilisi&luctus=cras&et=non&ultrices=velit&posuere=nec&cubilia=nisi&curae=vulputate&nulla=nonummy&dapibus=maecenas&dolor=tincidunt&vel=lacus&est=at&donec=velit&odio=vivamus&justo=vel",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Mélina",
                "type": "artist",
                "uri": "http://studiopress.com/eget/orci/vehicula/condimentum/curabitur.png?morbi=cubilia&vel=curae&lectus=donec&in=pharetra&quam=magna&fringilla=vestibulum&rhoncus=aliquet&mauris=ultrices&enim=erat&leo=tortor&rhoncus=sollicitudin&sed=mi&vestibulum=sit&sit=amet&amet=lobortis&cursus=sapien&id=sapien&turpis=non&integer=mi&aliquet=integer&massa=ac&id=neque&lobortis=duis&convallis=bibendum&tortor=morbi&risus=non&dapibus=quam&augue=nec&vel=dui&accumsan=luctus&tellus=rutrum&nisi=nulla&eu=tellus&orci=in&mauris=sagittis&lacinia=dui&sapien=vel&quis=nisl&libero=duis&nullam=ac&sit=nibh&amet=fusce&turpis=lacus&elementum=purus&ligula=aliquet&vehicula=at&consequat=feugiat&morbi=non&a=pretium&ipsum=quis&integer=lectus&a=suspendisse&nibh=potenti&in=in&quis=eleifend&justo=quam&maecenas=a&rhoncus=odio&aliquam=in&lacus=hac&morbi=habitasse&quis=platea&tortor=dictumst&id=maecenas&nulla=ut&ultrices=massa&aliquet=quis&maecenas=augue&leo=luctus&odio=tincidunt&condimentum=nulla&id=mollis&luctus=molestie&nec=lorem&molestie=quisque"
            }
        ],
        "available_markets": "BR"
    }, {
        "album_type": "Rev",
        "artists": [
            {
                "external_urls": {
                    "spotify": "https://epa.gov/lacus/at/turpis/donec/posuere/metus/vitae.aspx?dolor=vestibulum&sit=rutrum&amet=rutrum&consectetuer=neque&adipiscing=aenean&elit=auctor&proin=gravida&risus=sem&praesent=praesent&lectus=id&vestibulum=massa&quam=id&sapien=nisl&varius=venenatis&ut=lacinia&blandit=aenean&non=sit&interdum=amet&in=justo&ante=morbi&vestibulum=ut&ante=odio&ipsum=cras&primis=mi&in=pede&faucibus=malesuada&orci=in&luctus=imperdiet&et=et&ultrices=commodo&posuere=vulputate&cubilia=justo&curae=in"
                },
                "href": "http://chicagotribune.com/sit/amet/sapien/dignissim.aspx?semper=phasellus&sapien=in&a=felis&libero=donec&nam=semper&dui=sapien&proin=a&leo=libero&odio=nam&porttitor=dui&id=proin&consequat=leo&in=odio&consequat=porttitor&ut=id&nulla=consequat&sed=in&accumsan=consequat&felis=ut&ut=nulla&at=sed&dolor=accumsan&quis=felis&odio=ut&consequat=at&varius=dolor&integer=quis&ac=odio&leo=consequat&pellentesque=varius&ultrices=integer&mattis=ac&odio=leo&donec=pellentesque&vitae=ultrices",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Rébecca",
                "type": "artist",
                "uri": "https://artisteer.com/vestibulum/ante.json?eu=ac&tincidunt=consequat&in=metus&leo=sapien&maecenas=ut&pulvinar=nunc&lobortis=vestibulum&est=ante&phasellus=ipsum&sit=primis&amet=in&erat=faucibus&nulla=orci&tempus=luctus&vivamus=et&in=ultrices&felis=posuere&eu=cubilia&sapien=curae&cursus=mauris&vestibulum=viverra&proin=diam&eu=vitae&mi=quam&nulla=suspendisse&ac=potenti&enim=nullam&in=porttitor&tempor=lacus&turpis=at&nec=turpis&euismod=donec&scelerisque=posuere&quam=metus&turpis=vitae&adipiscing=ipsum&lorem=aliquam&vitae=non&mattis=mauris&nibh=morbi&ligula=non&nec=lectus&sem=aliquam&duis=sit&aliquam=amet&convallis=diam&nunc=in&proin=magna&at=bibendum&turpis=imperdiet&a=nullam&pede=orci&posuere=pede&nonummy=venenatis&integer=non&non=sodales&velit=sed&donec=tincidunt&diam=eu&neque=felis&vestibulum=fusce&eget=posuere&vulputate=felis&ut=sed&ultrices=lacus&vel=morbi&augue=sem&vestibulum=mauris&ante=laoreet&ipsum=ut&primis=rhoncus&in=aliquet&faucibus=pulvinar&orci=sed&luctus=nisl&et=nunc&ultrices=rhoncus&posuere=dui&cubilia=vel&curae=sem&donec=sed&pharetra=sagittis&magna=nam&vestibulum=congue&aliquet=risus&ultrices=semper&erat=porta&tortor=volutpat&sollicitudin=quam&mi=pede&sit=lobortis&amet=ligula&lobortis=sit&sapien=amet&sapien=eleifend"
            }
        ],
        "available_markets": "DK"
    }, {
        "album_type": "Ms",
        "artists": [
            {
                "external_urls": {
                    "spotify": "https://google.co.uk/dui/nec.json?libero=in&quis=porttitor&orci=pede&nullam=justo&molestie=eu&nibh=massa&in=donec&lectus=dapibus&pellentesque=duis&at=at&nulla=velit&suspendisse=eu&potenti=est&cras=congue&in=elementum&purus=in&eu=hac&magna=habitasse&vulputate=platea&luctus=dictumst&cum=morbi&sociis=vestibulum&natoque=velit&penatibus=id&et=pretium&magnis=iaculis&dis=diam&parturient=erat&montes=fermentum&nascetur=justo&ridiculus=nec&mus=condimentum&vivamus=neque&vestibulum=sapien&sagittis=placerat&sapien=ante&cum=nulla&sociis=justo&natoque=aliquam&penatibus=quis&et=turpis&magnis=eget&dis=elit&parturient=sodales&montes=scelerisque&nascetur=mauris&ridiculus=sit&mus=amet&etiam=eros&vel=suspendisse&augue=accumsan&vestibulum=tortor&rutrum=quis&rutrum=turpis&neque=sed&aenean=ante&auctor=vivamus&gravida=tortor&sem=duis&praesent=mattis&id=egestas&massa=metus&id=aenean&nisl=fermentum&venenatis=donec&lacinia=ut&aenean=mauris&sit=eget&amet=massa&justo=tempor&morbi=convallis&ut=nulla&odio=neque&cras=libero&mi=convallis&pede=eget&malesuada=eleifend&in=luctus&imperdiet=ultricies&et=eu&commodo=nibh&vulputate=quisque&justo=id&in=justo&blandit=sit&ultrices=amet&enim=sapien&lorem=dignissim&ipsum=vestibulum&dolor=vestibulum&sit=ante&amet=ipsum&consectetuer=primis&adipiscing=in&elit=faucibus"
                },
                "href": "http://360.cn/libero/convallis/eget/eleifend/luctus/ultricies/eu.xml?interdum=sodales&in=sed&ante=tincidunt&vestibulum=eu&ante=felis&ipsum=fusce&primis=posuere&in=felis&faucibus=sed&orci=lacus&luctus=morbi&et=sem&ultrices=mauris&posuere=laoreet&cubilia=ut&curae=rhoncus&duis=aliquet&faucibus=pulvinar&accumsan=sed&odio=nisl&curabitur=nunc&convallis=rhoncus&duis=dui&consequat=vel&dui=sem&nec=sed&nisi=sagittis&volutpat=nam&eleifend=congue&donec=risus&ut=semper&dolor=porta&morbi=volutpat&vel=quam&lectus=pede",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Eléonore",
                "type": "artist",
                "uri": "http://example.com/sit/amet/cursus/id/turpis/integer/aliquet.html?pellentesque=dictumst&quisque=morbi&porta=vestibulum&volutpat=velit&erat=id&quisque=pretium&erat=iaculis&eros=diam&viverra=erat&eget=fermentum&congue=justo&eget=nec&semper=condimentum&rutrum=neque&nulla=sapien&nunc=placerat&purus=ante&phasellus=nulla"
            }
        ],
        "available_markets": "PH"
    }, {
        "album_type": "Ms",
        "artists": [
            {
                "external_urls": {
                    "spotify": "https://biblegateway.com/ultrices/erat/tortor.html?faucibus=et&accumsan=ultrices&odio=posuere&curabitur=cubilia&convallis=curae&duis=mauris&consequat=viverra&dui=diam&nec=vitae&nisi=quam&volutpat=suspendisse&eleifend=potenti&donec=nullam&ut=porttitor&dolor=lacus&morbi=at&vel=turpis&lectus=donec&in=posuere&quam=metus&fringilla=vitae"
                },
                "href": "http://china.com.cn/eu/est/congue/elementum.jpg?id=erat&nisl=quisque&venenatis=erat&lacinia=eros&aenean=viverra&sit=eget&amet=congue&justo=eget&morbi=semper&ut=rutrum&odio=nulla&cras=nunc&mi=purus&pede=phasellus&malesuada=in&in=felis&imperdiet=donec&et=semper",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Publicité",
                "type": "artist",
                "uri": "https://patch.com/nascetur/ridiculus/mus/etiam.html?enim=erat&lorem=volutpat&ipsum=in&dolor=congue&sit=etiam&amet=justo&consectetuer=etiam&adipiscing=pretium&elit=iaculis&proin=justo&interdum=in&mauris=hac&non=habitasse&ligula=platea&pellentesque=dictumst&ultrices=etiam&phasellus=faucibus&id=cursus&sapien=urna"
            }
        ],
        "available_markets": "NO"
    }, {
        "album_type": "Ms",
        "artists": [
            {
                "external_urls": {
                    "spotify": "https://gravatar.com/tempor/convallis/nulla/neque/libero/convallis/eget.json?ridiculus=neque&mus=duis&vivamus=bibendum&vestibulum=morbi&sagittis=non&sapien=quam&cum=nec&sociis=dui&natoque=luctus&penatibus=rutrum&et=nulla&magnis=tellus&dis=in&parturient=sagittis&montes=dui&nascetur=vel&ridiculus=nisl&mus=duis&etiam=ac&vel=nibh&augue=fusce&vestibulum=lacus&rutrum=purus&rutrum=aliquet&neque=at&aenean=feugiat&auctor=non&gravida=pretium&sem=quis&praesent=lectus&id=suspendisse&massa=potenti&id=in&nisl=eleifend&venenatis=quam&lacinia=a&aenean=odio&sit=in&amet=hac&justo=habitasse&morbi=platea&ut=dictumst&odio=maecenas&cras=ut&mi=massa&pede=quis&malesuada=augue&in=luctus&imperdiet=tincidunt&et=nulla&commodo=mollis&vulputate=molestie&justo=lorem&in=quisque&blandit=ut&ultrices=erat&enim=curabitur&lorem=gravida&ipsum=nisi&dolor=at&sit=nibh&amet=in&consectetuer=hac&adipiscing=habitasse&elit=platea&proin=dictumst&interdum=aliquam&mauris=augue&non=quam&ligula=sollicitudin&pellentesque=vitae"
                },
                "href": "http://weather.com/justo/maecenas/rhoncus/aliquam/lacus/morbi.aspx?pede=magna&ac=ac&diam=consequat&cras=metus&pellentesque=sapien&volutpat=ut&dui=nunc&maecenas=vestibulum&tristique=ante&est=ipsum&et=primis&tempus=in&semper=faucibus&est=orci&quam=luctus&pharetra=et&magna=ultrices&ac=posuere&consequat=cubilia&metus=curae&sapien=mauris&ut=viverra&nunc=diam&vestibulum=vitae&ante=quam&ipsum=suspendisse&primis=potenti&in=nullam&faucibus=porttitor&orci=lacus&luctus=at",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Méryl",
                "type": "artist",
                "uri": "http://icq.com/curae.jpg?dolor=ut&quis=blandit&odio=non&consequat=interdum&varius=in&integer=ante&ac=vestibulum&leo=ante&pellentesque=ipsum&ultrices=primis&mattis=in&odio=faucibus&donec=orci&vitae=luctus&nisi=et&nam=ultrices&ultrices=posuere&libero=cubilia&non=curae&mattis=duis&pulvinar=faucibus&nulla=accumsan&pede=odio&ullamcorper=curabitur&augue=convallis"
            }
        ],
        "available_markets": "US"
    }, {
        "album_type": "Rev",
        "artists": [
            {
                "external_urls": {
                    "spotify": "https://aol.com/justo/in/hac/habitasse/platea.html?sed=mauris&accumsan=enim&felis=leo&ut=rhoncus&at=sed&dolor=vestibulum&quis=sit&odio=amet&consequat=cursus&varius=id&integer=turpis&ac=integer&leo=aliquet&pellentesque=massa&ultrices=id&mattis=lobortis&odio=convallis&donec=tortor&vitae=risus&nisi=dapibus&nam=augue&ultrices=vel&libero=accumsan&non=tellus&mattis=nisi&pulvinar=eu&nulla=orci&pede=mauris&ullamcorper=lacinia&augue=sapien&a=quis&suscipit=libero&nulla=nullam&elit=sit&ac=amet&nulla=turpis&sed=elementum&vel=ligula&enim=vehicula&sit=consequat&amet=morbi&nunc=a&viverra=ipsum&dapibus=integer&nulla=a&suscipit=nibh&ligula=in&in=quis&lacus=justo&curabitur=maecenas&at=rhoncus&ipsum=aliquam&ac=lacus&tellus=morbi&semper=quis&interdum=tortor&mauris=id&ullamcorper=nulla&purus=ultrices&sit=aliquet&amet=maecenas&nulla=leo&quisque=odio&arcu=condimentum&libero=id&rutrum=luctus&ac=nec&lobortis=molestie&vel=sed&dapibus=justo&at=pellentesque"
                },
                "href": "https://freewebs.com/duis.aspx?proin=eget&risus=rutrum&praesent=at&lectus=lorem&vestibulum=integer&quam=tincidunt&sapien=ante&varius=vel&ut=ipsum&blandit=praesent&non=blandit&interdum=lacinia&in=erat&ante=vestibulum&vestibulum=sed&ante=magna&ipsum=at&primis=nunc&in=commodo&faucibus=placerat&orci=praesent&luctus=blandit&et=nam&ultrices=nulla&posuere=integer&cubilia=pede&curae=justo&duis=lacinia&faucibus=eget&accumsan=tincidunt&odio=eget&curabitur=tempus&convallis=vel&duis=pede&consequat=morbi&dui=porttitor",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Crééz",
                "type": "artist",
                "uri": "https://boston.com/pellentesque/ultrices/mattis/odio.jpg?est=ligula&lacinia=vehicula&nisi=consequat&venenatis=morbi&tristique=a&fusce=ipsum&congue=integer&diam=a&id=nibh&ornare=in&imperdiet=quis&sapien=justo&urna=maecenas&pretium=rhoncus&nisl=aliquam&ut=lacus&volutpat=morbi&sapien=quis&arcu=tortor&sed=id&augue=nulla&aliquam=ultrices&erat=aliquet&volutpat=maecenas&in=leo&congue=odio&etiam=condimentum&justo=id&etiam=luctus&pretium=nec&iaculis=molestie&justo=sed&in=justo&hac=pellentesque&habitasse=viverra&platea=pede&dictumst=ac&etiam=diam&faucibus=cras&cursus=pellentesque&urna=volutpat"
            }
        ],
        "available_markets": "ES"
    }, {
        "album_type": "Dr",
        "artists": [
            {
                "external_urls": {
                    "spotify": "http://uol.com.br/faucibus/cursus/urna/ut/tellus.html?neque=vel&sapien=ipsum&placerat=praesent&ante=blandit&nulla=lacinia&justo=erat&aliquam=vestibulum&quis=sed&turpis=magna&eget=at&elit=nunc&sodales=commodo&scelerisque=placerat"
                },
                "href": "https://netscape.com/diam/vitae/quam/suspendisse/potenti/nullam/porttitor.jsp?justo=leo&maecenas=odio&rhoncus=porttitor&aliquam=id&lacus=consequat&morbi=in&quis=consequat&tortor=ut&id=nulla&nulla=sed&ultrices=accumsan&aliquet=felis&maecenas=ut&leo=at&odio=dolor&condimentum=quis&id=odio&luctus=consequat&nec=varius&molestie=integer&sed=ac&justo=leo&pellentesque=pellentesque&viverra=ultrices&pede=mattis&ac=odio&diam=donec&cras=vitae&pellentesque=nisi&volutpat=nam&dui=ultrices&maecenas=libero&tristique=non&est=mattis&et=pulvinar&tempus=nulla&semper=pede&est=ullamcorper&quam=augue&pharetra=a&magna=suscipit&ac=nulla&consequat=elit&metus=ac&sapien=nulla&ut=sed&nunc=vel&vestibulum=enim&ante=sit&ipsum=amet&primis=nunc&in=viverra&faucibus=dapibus&orci=nulla&luctus=suscipit&et=ligula",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Marie-ève",
                "type": "artist",
                "uri": "http://mlb.com/erat/vestibulum/sed/magna.xml?sed=nullam&tincidunt=porttitor&eu=lacus&felis=at&fusce=turpis&posuere=donec&felis=posuere&sed=metus&lacus=vitae&morbi=ipsum&sem=aliquam&mauris=non&laoreet=mauris&ut=morbi&rhoncus=non&aliquet=lectus&pulvinar=aliquam&sed=sit&nisl=amet&nunc=diam&rhoncus=in&dui=magna&vel=bibendum&sem=imperdiet&sed=nullam&sagittis=orci&nam=pede&congue=venenatis&risus=non&semper=sodales&porta=sed&volutpat=tincidunt&quam=eu&pede=felis&lobortis=fusce&ligula=posuere&sit=felis&amet=sed&eleifend=lacus&pede=morbi&libero=sem&quis=mauris&orci=laoreet&nullam=ut&molestie=rhoncus&nibh=aliquet&in=pulvinar&lectus=sed&pellentesque=nisl&at=nunc&nulla=rhoncus&suspendisse=dui&potenti=vel&cras=sem&in=sed&purus=sagittis&eu=nam&magna=congue&vulputate=risus&luctus=semper&cum=porta&sociis=volutpat&natoque=quam&penatibus=pede&et=lobortis&magnis=ligula&dis=sit&parturient=amet&montes=eleifend"
            }
        ],
        "available_markets": "SI"
    }, {
        "album_type": "Rev",
        "artists": [
            {
                "external_urls": {
                    "spotify": "https://home.pl/vestibulum/aliquet.js?rhoncus=luctus&aliquet=et&pulvinar=ultrices&sed=posuere&nisl=cubilia&nunc=curae&rhoncus=mauris&dui=viverra&vel=diam&sem=vitae&sed=quam&sagittis=suspendisse&nam=potenti&congue=nullam&risus=porttitor&semper=lacus&porta=at&volutpat=turpis&quam=donec&pede=posuere&lobortis=metus&ligula=vitae&sit=ipsum&amet=aliquam&eleifend=non"
                },
                "href": "https://youtube.com/elementum/in/hac/habitasse.png?nulla=dolor&elit=sit&ac=amet&nulla=consectetuer&sed=adipiscing&vel=elit&enim=proin&sit=risus&amet=praesent&nunc=lectus&viverra=vestibulum&dapibus=quam&nulla=sapien&suscipit=varius&ligula=ut&in=blandit&lacus=non&curabitur=interdum&at=in&ipsum=ante&ac=vestibulum&tellus=ante&semper=ipsum&interdum=primis&mauris=in&ullamcorper=faucibus&purus=orci&sit=luctus&amet=et&nulla=ultrices&quisque=posuere&arcu=cubilia",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Personnalisée",
                "type": "artist",
                "uri": "https://soundcloud.com/eu/massa.json?aliquam=eget&non=congue&mauris=eget&morbi=semper&non=rutrum&lectus=nulla&aliquam=nunc&sit=purus&amet=phasellus&diam=in&in=felis&magna=donec&bibendum=semper&imperdiet=sapien&nullam=a&orci=libero&pede=nam&venenatis=dui&non=proin&sodales=leo&sed=odio&tincidunt=porttitor&eu=id&felis=consequat&fusce=in&posuere=consequat&felis=ut&sed=nulla&lacus=sed&morbi=accumsan&sem=felis&mauris=ut&laoreet=at&ut=dolor&rhoncus=quis&aliquet=odio&pulvinar=consequat&sed=varius&nisl=integer&nunc=ac&rhoncus=leo&dui=pellentesque&vel=ultrices&sem=mattis&sed=odio&sagittis=donec&nam=vitae&congue=nisi&risus=nam"
            }
        ],
        "available_markets": "BY"
    }, {
        "album_type": "Mrs",
        "artists": [
            {
                "external_urls": {
                    "spotify": "http://biblegateway.com/natoque/penatibus.aspx?orci=eleifend&luctus=quam&et=a&ultrices=odio&posuere=in&cubilia=hac&curae=habitasse&donec=platea&pharetra=dictumst&magna=maecenas&vestibulum=ut&aliquet=massa&ultrices=quis&erat=augue&tortor=luctus&sollicitudin=tincidunt&mi=nulla&sit=mollis&amet=molestie&lobortis=lorem&sapien=quisque&sapien=ut&non=erat"
                },
                "href": "https://etsy.com/molestie/hendrerit/at/vulputate/vitae/nisl/aenean.js?velit=nullam&vivamus=porttitor&vel=lacus&nulla=at&eget=turpis&eros=donec&elementum=posuere&pellentesque=metus&quisque=vitae&porta=ipsum&volutpat=aliquam&erat=non&quisque=mauris&erat=morbi&eros=non&viverra=lectus&eget=aliquam",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Pénélope",
                "type": "artist",
                "uri": "https://dagondesign.com/vestibulum/quam/sapien/varius/ut.html?donec=donec&pharetra=ut&magna=mauris&vestibulum=eget&aliquet=massa&ultrices=tempor&erat=convallis&tortor=nulla&sollicitudin=neque&mi=libero&sit=convallis&amet=eget&lobortis=eleifend&sapien=luctus&sapien=ultricies&non=eu&mi=nibh&integer=quisque&ac=id&neque=justo&duis=sit&bibendum=amet&morbi=sapien&non=dignissim&quam=vestibulum&nec=vestibulum&dui=ante&luctus=ipsum&rutrum=primis&nulla=in&tellus=faucibus&in=orci&sagittis=luctus&dui=et&vel=ultrices&nisl=posuere&duis=cubilia&ac=curae&nibh=nulla&fusce=dapibus&lacus=dolor&purus=vel&aliquet=est&at=donec&feugiat=odio&non=justo&pretium=sollicitudin&quis=ut&lectus=suscipit&suspendisse=a&potenti=feugiat&in=et&eleifend=eros&quam=vestibulum&a=ac&odio=est&in=lacinia&hac=nisi&habitasse=venenatis&platea=tristique&dictumst=fusce&maecenas=congue&ut=diam&massa=id&quis=ornare&augue=imperdiet&luctus=sapien&tincidunt=urna&nulla=pretium&mollis=nisl&molestie=ut&lorem=volutpat&quisque=sapien&ut=arcu&erat=sed&curabitur=augue&gravida=aliquam&nisi=erat&at=volutpat&nibh=in&in=congue&hac=etiam&habitasse=justo&platea=etiam&dictumst=pretium&aliquam=iaculis&augue=justo&quam=in&sollicitudin=hac&vitae=habitasse&consectetuer=platea&eget=dictumst&rutrum=etiam&at=faucibus&lorem=cursus"
            }
        ],
        "available_markets": "UY"
    }, {
        "album_type": "Honorable",
        "artists": [
            {
                "external_urls": {
                    "spotify": "http://msn.com/nisl/duis/bibendum/felis/sed/interdum/venenatis.aspx?et=magna&commodo=vulputate&vulputate=luctus&justo=cum&in=sociis&blandit=natoque&ultrices=penatibus&enim=et&lorem=magnis&ipsum=dis&dolor=parturient&sit=montes&amet=nascetur&consectetuer=ridiculus&adipiscing=mus&elit=vivamus&proin=vestibulum&interdum=sagittis&mauris=sapien&non=cum&ligula=sociis&pellentesque=natoque&ultrices=penatibus&phasellus=et&id=magnis&sapien=dis&in=parturient&sapien=montes&iaculis=nascetur&congue=ridiculus&vivamus=mus&metus=etiam"
                },
                "href": "https://google.pl/tempor/turpis/nec/euismod/scelerisque.js?maecenas=in&rhoncus=felis&aliquam=donec&lacus=semper&morbi=sapien&quis=a&tortor=libero&id=nam&nulla=dui&ultrices=proin&aliquet=leo&maecenas=odio&leo=porttitor&odio=id&condimentum=consequat&id=in&luctus=consequat&nec=ut&molestie=nulla&sed=sed&justo=accumsan",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Lorène",
                "type": "artist",
                "uri": "http://barnesandnoble.com/amet/lobortis/sapien/sapien/non/mi.jsp?sed=nulla&tristique=tellus&in=in&tempus=sagittis&sit=dui&amet=vel&sem=nisl&fusce=duis&consequat=ac&nulla=nibh&nisl=fusce&nunc=lacus&nisl=purus&duis=aliquet&bibendum=at&felis=feugiat&sed=non&interdum=pretium&venenatis=quis&turpis=lectus&enim=suspendisse&blandit=potenti&mi=in&in=eleifend&porttitor=quam&pede=a&justo=odio&eu=in&massa=hac&donec=habitasse&dapibus=platea&duis=dictumst&at=maecenas&velit=ut&eu=massa&est=quis&congue=augue&elementum=luctus&in=tincidunt&hac=nulla&habitasse=mollis&platea=molestie&dictumst=lorem&morbi=quisque&vestibulum=ut&velit=erat&id=curabitur&pretium=gravida&iaculis=nisi&diam=at&erat=nibh&fermentum=in&justo=hac&nec=habitasse&condimentum=platea&neque=dictumst&sapien=aliquam&placerat=augue&ante=quam&nulla=sollicitudin&justo=vitae&aliquam=consectetuer&quis=eget&turpis=rutrum&eget=at&elit=lorem&sodales=integer&scelerisque=tincidunt&mauris=ante&sit=vel&amet=ipsum&eros=praesent&suspendisse=blandit&accumsan=lacinia&tortor=erat&quis=vestibulum&turpis=sed&sed=magna&ante=at&vivamus=nunc&tortor=commodo&duis=placerat&mattis=praesent&egestas=blandit&metus=nam&aenean=nulla&fermentum=integer&donec=pede&ut=justo&mauris=lacinia&eget=eget&massa=tincidunt&tempor=eget&convallis=tempus&nulla=vel&neque=pede&libero=morbi&convallis=porttitor&eget=lorem"
            }
        ],
        "available_markets": "QA"
    }, {
        "album_type": "Honorable",
        "artists": [
            {
                "external_urls": {
                    "spotify": "https://artisteer.com/ultrices.png?erat=odio&eros=porttitor&viverra=id&eget=consequat&congue=in&eget=consequat&semper=ut&rutrum=nulla&nulla=sed&nunc=accumsan&purus=felis"
                },
                "href": "https://stumbleupon.com/semper/est/quam/pharetra/magna.jsp?nam=nulla&nulla=tellus&integer=in&pede=sagittis&justo=dui&lacinia=vel&eget=nisl&tincidunt=duis&eget=ac&tempus=nibh&vel=fusce&pede=lacus&morbi=purus&porttitor=aliquet&lorem=at&id=feugiat&ligula=non&suspendisse=pretium&ornare=quis&consequat=lectus&lectus=suspendisse&in=potenti&est=in&risus=eleifend&auctor=quam&sed=a&tristique=odio&in=in&tempus=hac&sit=habitasse&amet=platea&sem=dictumst&fusce=maecenas&consequat=ut&nulla=massa&nisl=quis&nunc=augue&nisl=luctus&duis=tincidunt&bibendum=nulla&felis=mollis&sed=molestie&interdum=lorem&venenatis=quisque&turpis=ut&enim=erat&blandit=curabitur&mi=gravida&in=nisi&porttitor=at&pede=nibh&justo=in&eu=hac&massa=habitasse&donec=platea&dapibus=dictumst&duis=aliquam&at=augue&velit=quam&eu=sollicitudin&est=vitae&congue=consectetuer&elementum=eget&in=rutrum&hac=at&habitasse=lorem&platea=integer&dictumst=tincidunt&morbi=ante&vestibulum=vel&velit=ipsum&id=praesent&pretium=blandit&iaculis=lacinia&diam=erat&erat=vestibulum&fermentum=sed&justo=magna&nec=at&condimentum=nunc&neque=commodo&sapien=placerat&placerat=praesent&ante=blandit",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Adèle",
                "type": "artist",
                "uri": "https://webnode.com/viverra.jpg?libero=erat&non=eros&mattis=viverra&pulvinar=eget&nulla=congue&pede=eget&ullamcorper=semper&augue=rutrum&a=nulla&suscipit=nunc&nulla=purus&elit=phasellus&ac=in&nulla=felis&sed=donec&vel=semper&enim=sapien&sit=a&amet=libero&nunc=nam&viverra=dui&dapibus=proin&nulla=leo&suscipit=odio&ligula=porttitor&in=id&lacus=consequat&curabitur=in&at=consequat&ipsum=ut&ac=nulla&tellus=sed&semper=accumsan&interdum=felis&mauris=ut&ullamcorper=at&purus=dolor&sit=quis&amet=odio&nulla=consequat&quisque=varius&arcu=integer&libero=ac&rutrum=leo"
            }
        ],
        "available_markets": "ID"
    }, {
        "album_type": "Mr",
        "artists": [
            {
                "external_urls": {
                    "spotify": "http://twitter.com/ut.js?ultrices=odio&mattis=condimentum&odio=id&donec=luctus&vitae=nec&nisi=molestie&nam=sed&ultrices=justo&libero=pellentesque&non=viverra&mattis=pede&pulvinar=ac&nulla=diam&pede=cras&ullamcorper=pellentesque&augue=volutpat&a=dui&suscipit=maecenas&nulla=tristique&elit=est&ac=et&nulla=tempus&sed=semper&vel=est&enim=quam&sit=pharetra&amet=magna&nunc=ac&viverra=consequat&dapibus=metus&nulla=sapien&suscipit=ut&ligula=nunc&in=vestibulum&lacus=ante&curabitur=ipsum&at=primis&ipsum=in&ac=faucibus&tellus=orci&semper=luctus&interdum=et&mauris=ultrices&ullamcorper=posuere&purus=cubilia&sit=curae&amet=mauris&nulla=viverra&quisque=diam&arcu=vitae&libero=quam&rutrum=suspendisse"
                },
                "href": "https://google.com/massa/volutpat/convallis.png?at=cras&nunc=in&commodo=purus&placerat=eu&praesent=magna&blandit=vulputate&nam=luctus&nulla=cum&integer=sociis&pede=natoque&justo=penatibus&lacinia=et&eget=magnis&tincidunt=dis&eget=parturient&tempus=montes&vel=nascetur&pede=ridiculus&morbi=mus&porttitor=vivamus&lorem=vestibulum&id=sagittis&ligula=sapien&suspendisse=cum&ornare=sociis&consequat=natoque&lectus=penatibus&in=et&est=magnis&risus=dis&auctor=parturient&sed=montes&tristique=nascetur&in=ridiculus&tempus=mus&sit=etiam&amet=vel&sem=augue&fusce=vestibulum&consequat=rutrum&nulla=rutrum&nisl=neque&nunc=aenean&nisl=auctor&duis=gravida&bibendum=sem&felis=praesent&sed=id&interdum=massa&venenatis=id&turpis=nisl&enim=venenatis&blandit=lacinia&mi=aenean&in=sit&porttitor=amet&pede=justo&justo=morbi&eu=ut&massa=odio&donec=cras&dapibus=mi&duis=pede&at=malesuada&velit=in&eu=imperdiet&est=et&congue=commodo&elementum=vulputate&in=justo&hac=in&habitasse=blandit&platea=ultrices&dictumst=enim&morbi=lorem&vestibulum=ipsum&velit=dolor&id=sit&pretium=amet&iaculis=consectetuer&diam=adipiscing&erat=elit&fermentum=proin&justo=interdum&nec=mauris&condimentum=non&neque=ligula&sapien=pellentesque&placerat=ultrices&ante=phasellus&nulla=id&justo=sapien&aliquam=in&quis=sapien&turpis=iaculis",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Aimée",
                "type": "artist",
                "uri": "http://paypal.com/sit/amet/nunc.png?sollicitudin=integer&vitae=pede&consectetuer=justo&eget=lacinia&rutrum=eget&at=tincidunt&lorem=eget&integer=tempus&tincidunt=vel&ante=pede&vel=morbi&ipsum=porttitor&praesent=lorem&blandit=id&lacinia=ligula&erat=suspendisse&vestibulum=ornare&sed=consequat&magna=lectus&at=in&nunc=est&commodo=risus&placerat=auctor&praesent=sed&blandit=tristique&nam=in&nulla=tempus&integer=sit&pede=amet&justo=sem&lacinia=fusce&eget=consequat&tincidunt=nulla&eget=nisl&tempus=nunc&vel=nisl&pede=duis&morbi=bibendum&porttitor=felis&lorem=sed&id=interdum&ligula=venenatis&suspendisse=turpis&ornare=enim&consequat=blandit&lectus=mi&in=in&est=porttitor&risus=pede&auctor=justo&sed=eu&tristique=massa&in=donec&tempus=dapibus&sit=duis&amet=at&sem=velit&fusce=eu&consequat=est&nulla=congue&nisl=elementum&nunc=in&nisl=hac&duis=habitasse&bibendum=platea&felis=dictumst&sed=morbi&interdum=vestibulum&venenatis=velit&turpis=id&enim=pretium&blandit=iaculis&mi=diam&in=erat&porttitor=fermentum&pede=justo"
            }
        ],
        "available_markets": "UG"
    }, {
        "album_type": "Ms",
        "artists": [
            {
                "external_urls": {
                    "spotify": "http://smugmug.com/proin/eu/mi/nulla/ac.png?vel=lobortis&augue=sapien&vestibulum=sapien&ante=non&ipsum=mi&primis=integer&in=ac&faucibus=neque&orci=duis&luctus=bibendum&et=morbi&ultrices=non&posuere=quam&cubilia=nec&curae=dui&donec=luctus&pharetra=rutrum&magna=nulla&vestibulum=tellus&aliquet=in&ultrices=sagittis&erat=dui&tortor=vel&sollicitudin=nisl&mi=duis&sit=ac&amet=nibh&lobortis=fusce&sapien=lacus&sapien=purus&non=aliquet&mi=at&integer=feugiat&ac=non&neque=pretium&duis=quis&bibendum=lectus&morbi=suspendisse"
                },
                "href": "https://ning.com/praesent/blandit/nam/nulla/integer/pede.js?imperdiet=at&sapien=velit&urna=eu&pretium=est&nisl=congue&ut=elementum&volutpat=in&sapien=hac&arcu=habitasse&sed=platea&augue=dictumst&aliquam=morbi&erat=vestibulum&volutpat=velit&in=id&congue=pretium&etiam=iaculis&justo=diam&etiam=erat&pretium=fermentum&iaculis=justo&justo=nec&in=condimentum&hac=neque&habitasse=sapien&platea=placerat&dictumst=ante&etiam=nulla&faucibus=justo&cursus=aliquam&urna=quis&ut=turpis&tellus=eget&nulla=elit&ut=sodales&erat=scelerisque&id=mauris&mauris=sit&vulputate=amet&elementum=eros&nullam=suspendisse&varius=accumsan&nulla=tortor&facilisi=quis&cras=turpis",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Kévina",
                "type": "artist",
                "uri": "https://businessweek.com/tristique/fusce/congue/diam/id/ornare/imperdiet.js?maecenas=rutrum&ut=nulla&massa=nunc&quis=purus&augue=phasellus&luctus=in&tincidunt=felis&nulla=donec&mollis=semper&molestie=sapien&lorem=a&quisque=libero&ut=nam&erat=dui&curabitur=proin&gravida=leo&nisi=odio&at=porttitor&nibh=id&in=consequat&hac=in&habitasse=consequat&platea=ut&dictumst=nulla&aliquam=sed&augue=accumsan&quam=felis&sollicitudin=ut&vitae=at&consectetuer=dolor&eget=quis&rutrum=odio&at=consequat&lorem=varius&integer=integer&tincidunt=ac&ante=leo&vel=pellentesque&ipsum=ultrices&praesent=mattis&blandit=odio&lacinia=donec&erat=vitae&vestibulum=nisi&sed=nam&magna=ultrices&at=libero&nunc=non&commodo=mattis&placerat=pulvinar&praesent=nulla&blandit=pede&nam=ullamcorper&nulla=augue&integer=a&pede=suscipit&justo=nulla&lacinia=elit&eget=ac&tincidunt=nulla&eget=sed&tempus=vel&vel=enim&pede=sit&morbi=amet&porttitor=nunc&lorem=viverra&id=dapibus&ligula=nulla&suspendisse=suscipit&ornare=ligula&consequat=in&lectus=lacus&in=curabitur&est=at"
            }
        ],
        "available_markets": "GB"
    }, {
        "album_type": "Rev",
        "artists": [
            {
                "external_urls": {
                    "spotify": "https://noaa.gov/est/risus.html?enim=non&blandit=sodales&mi=sed&in=tincidunt&porttitor=eu&pede=felis&justo=fusce&eu=posuere&massa=felis&donec=sed&dapibus=lacus&duis=morbi&at=sem&velit=mauris&eu=laoreet&est=ut&congue=rhoncus&elementum=aliquet&in=pulvinar&hac=sed&habitasse=nisl&platea=nunc&dictumst=rhoncus&morbi=dui&vestibulum=vel&velit=sem&id=sed&pretium=sagittis&iaculis=nam&diam=congue&erat=risus&fermentum=semper&justo=porta&nec=volutpat&condimentum=quam&neque=pede&sapien=lobortis&placerat=ligula&ante=sit&nulla=amet&justo=eleifend&aliquam=pede&quis=libero&turpis=quis&eget=orci&elit=nullam&sodales=molestie&scelerisque=nibh&mauris=in&sit=lectus&amet=pellentesque&eros=at&suspendisse=nulla&accumsan=suspendisse&tortor=potenti&quis=cras&turpis=in&sed=purus&ante=eu&vivamus=magna&tortor=vulputate&duis=luctus&mattis=cum&egestas=sociis&metus=natoque&aenean=penatibus&fermentum=et&donec=magnis&ut=dis&mauris=parturient&eget=montes&massa=nascetur&tempor=ridiculus&convallis=mus&nulla=vivamus&neque=vestibulum&libero=sagittis&convallis=sapien&eget=cum"
                },
                "href": "https://live.com/nisl/ut/volutpat/sapien/arcu/sed.xml?dictumst=nibh&morbi=in&vestibulum=quis&velit=justo&id=maecenas&pretium=rhoncus&iaculis=aliquam&diam=lacus&erat=morbi&fermentum=quis&justo=tortor&nec=id&condimentum=nulla&neque=ultrices&sapien=aliquet&placerat=maecenas&ante=leo&nulla=odio&justo=condimentum&aliquam=id&quis=luctus&turpis=nec&eget=molestie&elit=sed&sodales=justo&scelerisque=pellentesque&mauris=viverra&sit=pede&amet=ac&eros=diam&suspendisse=cras&accumsan=pellentesque&tortor=volutpat&quis=dui&turpis=maecenas&sed=tristique&ante=est&vivamus=et&tortor=tempus&duis=semper&mattis=est&egestas=quam&metus=pharetra&aenean=magna&fermentum=ac&donec=consequat&ut=metus&mauris=sapien&eget=ut&massa=nunc&tempor=vestibulum&convallis=ante&nulla=ipsum&neque=primis&libero=in&convallis=faucibus&eget=orci&eleifend=luctus&luctus=et&ultricies=ultrices&eu=posuere&nibh=cubilia&quisque=curae&id=mauris&justo=viverra&sit=diam&amet=vitae&sapien=quam&dignissim=suspendisse&vestibulum=potenti&vestibulum=nullam&ante=porttitor&ipsum=lacus&primis=at&in=turpis&faucibus=donec&orci=posuere&luctus=metus&et=vitae&ultrices=ipsum&posuere=aliquam&cubilia=non&curae=mauris&nulla=morbi&dapibus=non&dolor=lectus&vel=aliquam&est=sit&donec=amet&odio=diam&justo=in&sollicitudin=magna&ut=bibendum&suscipit=imperdiet&a=nullam",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Valérie",
                "type": "artist",
                "uri": "http://hatena.ne.jp/sapien/quis/libero.js?justo=vestibulum&etiam=ante&pretium=ipsum&iaculis=primis&justo=in&in=faucibus&hac=orci&habitasse=luctus&platea=et&dictumst=ultrices&etiam=posuere&faucibus=cubilia&cursus=curae&urna=donec&ut=pharetra&tellus=magna&nulla=vestibulum&ut=aliquet&erat=ultrices&id=erat&mauris=tortor&vulputate=sollicitudin&elementum=mi&nullam=sit&varius=amet&nulla=lobortis&facilisi=sapien&cras=sapien&non=non&velit=mi&nec=integer&nisi=ac&vulputate=neque&nonummy=duis&maecenas=bibendum&tincidunt=morbi&lacus=non&at=quam&velit=nec&vivamus=dui&vel=luctus&nulla=rutrum&eget=nulla&eros=tellus&elementum=in&pellentesque=sagittis&quisque=dui&porta=vel&volutpat=nisl&erat=duis&quisque=ac&erat=nibh&eros=fusce&viverra=lacus&eget=purus&congue=aliquet&eget=at&semper=feugiat&rutrum=non&nulla=pretium&nunc=quis&purus=lectus&phasellus=suspendisse&in=potenti"
            }
        ],
        "available_markets": "IE"
    }, {
        "album_type": "Mr",
        "artists": [
            {
                "external_urls": {
                    "spotify": "https://pagesperso-orange.fr/lobortis.aspx?maecenas=convallis&ut=nunc&massa=proin&quis=at&augue=turpis&luctus=a&tincidunt=pede&nulla=posuere&mollis=nonummy&molestie=integer&lorem=non&quisque=velit&ut=donec&erat=diam&curabitur=neque&gravida=vestibulum&nisi=eget&at=vulputate&nibh=ut&in=ultrices&hac=vel&habitasse=augue&platea=vestibulum&dictumst=ante&aliquam=ipsum&augue=primis&quam=in&sollicitudin=faucibus&vitae=orci&consectetuer=luctus&eget=et&rutrum=ultrices&at=posuere&lorem=cubilia&integer=curae&tincidunt=donec&ante=pharetra&vel=magna&ipsum=vestibulum&praesent=aliquet&blandit=ultrices&lacinia=erat&erat=tortor&vestibulum=sollicitudin&sed=mi&magna=sit&at=amet&nunc=lobortis&commodo=sapien"
                },
                "href": "http://e-recht24.de/nulla/ultrices/aliquet/maecenas.png?nulla=lacinia&dapibus=sapien&dolor=quis&vel=libero&est=nullam&donec=sit&odio=amet&justo=turpis&sollicitudin=elementum&ut=ligula&suscipit=vehicula&a=consequat&feugiat=morbi&et=a&eros=ipsum&vestibulum=integer&ac=a&est=nibh&lacinia=in&nisi=quis&venenatis=justo&tristique=maecenas&fusce=rhoncus&congue=aliquam&diam=lacus&id=morbi&ornare=quis&imperdiet=tortor&sapien=id&urna=nulla&pretium=ultrices&nisl=aliquet&ut=maecenas&volutpat=leo&sapien=odio&arcu=condimentum&sed=id&augue=luctus&aliquam=nec&erat=molestie&volutpat=sed&in=justo&congue=pellentesque&etiam=viverra&justo=pede&etiam=ac&pretium=diam&iaculis=cras&justo=pellentesque&in=volutpat&hac=dui&habitasse=maecenas&platea=tristique&dictumst=est&etiam=et&faucibus=tempus&cursus=semper&urna=est&ut=quam&tellus=pharetra&nulla=magna&ut=ac&erat=consequat&id=metus&mauris=sapien&vulputate=ut&elementum=nunc&nullam=vestibulum&varius=ante",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Aloïs",
                "type": "artist",
                "uri": "http://ehow.com/donec/vitae/nisi.xml?vitae=lorem&consectetuer=quisque&eget=ut&rutrum=erat&at=curabitur&lorem=gravida&integer=nisi&tincidunt=at&ante=nibh&vel=in&ipsum=hac&praesent=habitasse&blandit=platea&lacinia=dictumst&erat=aliquam&vestibulum=augue&sed=quam&magna=sollicitudin&at=vitae&nunc=consectetuer&commodo=eget&placerat=rutrum&praesent=at&blandit=lorem&nam=integer&nulla=tincidunt&integer=ante&pede=vel&justo=ipsum&lacinia=praesent&eget=blandit&tincidunt=lacinia&eget=erat&tempus=vestibulum&vel=sed&pede=magna&morbi=at&porttitor=nunc&lorem=commodo&id=placerat&ligula=praesent&suspendisse=blandit&ornare=nam&consequat=nulla&lectus=integer&in=pede&est=justo&risus=lacinia&auctor=eget&sed=tincidunt&tristique=eget&in=tempus&tempus=vel&sit=pede&amet=morbi&sem=porttitor&fusce=lorem&consequat=id&nulla=ligula&nisl=suspendisse&nunc=ornare&nisl=consequat&duis=lectus&bibendum=in&felis=est&sed=risus&interdum=auctor&venenatis=sed&turpis=tristique&enim=in&blandit=tempus&mi=sit&in=amet&porttitor=sem&pede=fusce&justo=consequat&eu=nulla&massa=nisl&donec=nunc&dapibus=nisl&duis=duis&at=bibendum&velit=felis&eu=sed&est=interdum&congue=venenatis&elementum=turpis&in=enim&hac=blandit&habitasse=mi&platea=in&dictumst=porttitor&morbi=pede"
            }
        ],
        "available_markets": "VN"
    }, {
        "album_type": "Mr",
        "artists": [
            {
                "external_urls": {
                    "spotify": "http://diigo.com/amet/cursus/id/turpis/integer.jsp?ultrices=viverra&posuere=diam&cubilia=vitae&curae=quam&mauris=suspendisse&viverra=potenti&diam=nullam&vitae=porttitor&quam=lacus&suspendisse=at&potenti=turpis&nullam=donec&porttitor=posuere&lacus=metus&at=vitae&turpis=ipsum&donec=aliquam&posuere=non&metus=mauris&vitae=morbi&ipsum=non&aliquam=lectus&non=aliquam&mauris=sit&morbi=amet&non=diam&lectus=in&aliquam=magna&sit=bibendum&amet=imperdiet&diam=nullam&in=orci&magna=pede&bibendum=venenatis&imperdiet=non&nullam=sodales&orci=sed&pede=tincidunt&venenatis=eu&non=felis&sodales=fusce&sed=posuere&tincidunt=felis&eu=sed&felis=lacus&fusce=morbi&posuere=sem&felis=mauris&sed=laoreet&lacus=ut&morbi=rhoncus&sem=aliquet&mauris=pulvinar&laoreet=sed&ut=nisl&rhoncus=nunc&aliquet=rhoncus&pulvinar=dui&sed=vel&nisl=sem&nunc=sed&rhoncus=sagittis&dui=nam&vel=congue&sem=risus&sed=semper&sagittis=porta&nam=volutpat&congue=quam&risus=pede&semper=lobortis&porta=ligula&volutpat=sit&quam=amet&pede=eleifend&lobortis=pede&ligula=libero&sit=quis&amet=orci&eleifend=nullam&pede=molestie"
                },
                "href": "https://people.com.cn/nunc/donec/quis/orci/eget/orci/vehicula.jpg?platea=donec&dictumst=ut&morbi=dolor&vestibulum=morbi&velit=vel&id=lectus&pretium=in&iaculis=quam&diam=fringilla&erat=rhoncus&fermentum=mauris&justo=enim&nec=leo&condimentum=rhoncus&neque=sed&sapien=vestibulum&placerat=sit&ante=amet&nulla=cursus&justo=id&aliquam=turpis&quis=integer&turpis=aliquet&eget=massa&elit=id&sodales=lobortis&scelerisque=convallis&mauris=tortor&sit=risus&amet=dapibus&eros=augue&suspendisse=vel&accumsan=accumsan&tortor=tellus&quis=nisi&turpis=eu&sed=orci&ante=mauris&vivamus=lacinia&tortor=sapien",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Annotés",
                "type": "artist",
                "uri": "https://businesswire.com/accumsan/tortor/quis/turpis/sed.aspx?at=vestibulum&velit=proin&vivamus=eu&vel=mi&nulla=nulla&eget=ac&eros=enim&elementum=in&pellentesque=tempor&quisque=turpis&porta=nec&volutpat=euismod&erat=scelerisque&quisque=quam&erat=turpis&eros=adipiscing&viverra=lorem&eget=vitae&congue=mattis&eget=nibh&semper=ligula&rutrum=nec&nulla=sem&nunc=duis&purus=aliquam&phasellus=convallis&in=nunc&felis=proin&donec=at&semper=turpis&sapien=a&a=pede&libero=posuere&nam=nonummy&dui=integer&proin=non&leo=velit&odio=donec&porttitor=diam&id=neque&consequat=vestibulum&in=eget&consequat=vulputate&ut=ut&nulla=ultrices&sed=vel&accumsan=augue&felis=vestibulum&ut=ante&at=ipsum&dolor=primis"
            }
        ],
        "available_markets": "GT"
    }, {
        "album_type": "Honorable",
        "artists": [
            {
                "external_urls": {
                    "spotify": "https://sbwire.com/leo/rhoncus/sed.jsp?vel=metus&nulla=sapien&eget=ut&eros=nunc&elementum=vestibulum&pellentesque=ante&quisque=ipsum&porta=primis&volutpat=in&erat=faucibus&quisque=orci&erat=luctus&eros=et&viverra=ultrices&eget=posuere&congue=cubilia&eget=curae&semper=mauris&rutrum=viverra&nulla=diam&nunc=vitae&purus=quam&phasellus=suspendisse&in=potenti&felis=nullam&donec=porttitor&semper=lacus&sapien=at&a=turpis&libero=donec&nam=posuere&dui=metus&proin=vitae&leo=ipsum&odio=aliquam&porttitor=non&id=mauris&consequat=morbi&in=non&consequat=lectus&ut=aliquam&nulla=sit&sed=amet&accumsan=diam&felis=in&ut=magna&at=bibendum&dolor=imperdiet&quis=nullam&odio=orci&consequat=pede&varius=venenatis&integer=non&ac=sodales&leo=sed&pellentesque=tincidunt&ultrices=eu&mattis=felis&odio=fusce&donec=posuere&vitae=felis&nisi=sed&nam=lacus&ultrices=morbi&libero=sem&non=mauris&mattis=laoreet&pulvinar=ut&nulla=rhoncus&pede=aliquet&ullamcorper=pulvinar&augue=sed&a=nisl&suscipit=nunc&nulla=rhoncus&elit=dui&ac=vel&nulla=sem&sed=sed&vel=sagittis&enim=nam&sit=congue&amet=risus&nunc=semper&viverra=porta&dapibus=volutpat&nulla=quam&suscipit=pede&ligula=lobortis&in=ligula&lacus=sit&curabitur=amet&at=eleifend&ipsum=pede&ac=libero&tellus=quis&semper=orci&interdum=nullam"
                },
                "href": "http://mozilla.com/porta/volutpat.json?duis=tellus&bibendum=nulla&felis=ut&sed=erat&interdum=id&venenatis=mauris&turpis=vulputate&enim=elementum&blandit=nullam&mi=varius&in=nulla&porttitor=facilisi&pede=cras&justo=non&eu=velit&massa=nec&donec=nisi&dapibus=vulputate&duis=nonummy&at=maecenas&velit=tincidunt&eu=lacus&est=at&congue=velit&elementum=vivamus&in=vel&hac=nulla&habitasse=eget&platea=eros&dictumst=elementum&morbi=pellentesque&vestibulum=quisque&velit=porta&id=volutpat&pretium=erat&iaculis=quisque&diam=erat&erat=eros&fermentum=viverra&justo=eget&nec=congue&condimentum=eget&neque=semper&sapien=rutrum&placerat=nulla&ante=nunc&nulla=purus&justo=phasellus&aliquam=in&quis=felis&turpis=donec&eget=semper&elit=sapien&sodales=a&scelerisque=libero&mauris=nam&sit=dui&amet=proin&eros=leo&suspendisse=odio&accumsan=porttitor&tortor=id&quis=consequat&turpis=in&sed=consequat&ante=ut&vivamus=nulla&tortor=sed&duis=accumsan&mattis=felis&egestas=ut&metus=at&aenean=dolor&fermentum=quis&donec=odio&ut=consequat&mauris=varius&eget=integer&massa=ac&tempor=leo&convallis=pellentesque&nulla=ultrices",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Maëline",
                "type": "artist",
                "uri": "http://google.com.hk/est/lacinia.aspx?vestibulum=ipsum&ac=dolor&est=sit&lacinia=amet&nisi=consectetuer&venenatis=adipiscing&tristique=elit&fusce=proin&congue=interdum"
            }
        ],
        "available_markets": "GT"
    }, {
        "album_type": "Mr",
        "artists": [
            {
                "external_urls": {
                    "spotify": "http://dell.com/vel/est/donec.png?blandit=mauris&lacinia=non&erat=ligula&vestibulum=pellentesque&sed=ultrices&magna=phasellus&at=id&nunc=sapien&commodo=in&placerat=sapien&praesent=iaculis&blandit=congue&nam=vivamus&nulla=metus&integer=arcu&pede=adipiscing&justo=molestie&lacinia=hendrerit&eget=at&tincidunt=vulputate&eget=vitae&tempus=nisl&vel=aenean&pede=lectus&morbi=pellentesque&porttitor=eget&lorem=nunc&id=donec&ligula=quis&suspendisse=orci&ornare=eget&consequat=orci&lectus=vehicula&in=condimentum&est=curabitur&risus=in&auctor=libero&sed=ut&tristique=massa&in=volutpat"
                },
                "href": "http://epa.gov/cras/in/purus.json?metus=morbi&aenean=ut&fermentum=odio&donec=cras&ut=mi&mauris=pede&eget=malesuada&massa=in&tempor=imperdiet&convallis=et&nulla=commodo&neque=vulputate&libero=justo&convallis=in&eget=blandit&eleifend=ultrices&luctus=enim&ultricies=lorem&eu=ipsum&nibh=dolor&quisque=sit&id=amet&justo=consectetuer&sit=adipiscing&amet=elit&sapien=proin&dignissim=interdum&vestibulum=mauris&vestibulum=non&ante=ligula&ipsum=pellentesque&primis=ultrices&in=phasellus&faucibus=id&orci=sapien&luctus=in&et=sapien&ultrices=iaculis&posuere=congue&cubilia=vivamus&curae=metus&nulla=arcu&dapibus=adipiscing&dolor=molestie&vel=hendrerit&est=at&donec=vulputate&odio=vitae",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Valérie",
                "type": "artist",
                "uri": "http://feedburner.com/sodales/scelerisque/mauris.png?volutpat=augue&erat=vel&quisque=accumsan&erat=tellus&eros=nisi&viverra=eu&eget=orci&congue=mauris&eget=lacinia&semper=sapien&rutrum=quis&nulla=libero&nunc=nullam"
            }
        ],
        "available_markets": "SG"
    }, {
        "album_type": "Rev",
        "artists": [
            {
                "external_urls": {
                    "spotify": "http://storify.com/ipsum.js?enim=sed&lorem=lacus&ipsum=morbi&dolor=sem&sit=mauris&amet=laoreet&consectetuer=ut&adipiscing=rhoncus&elit=aliquet&proin=pulvinar&interdum=sed&mauris=nisl&non=nunc&ligula=rhoncus&pellentesque=dui&ultrices=vel&phasellus=sem&id=sed&sapien=sagittis&in=nam&sapien=congue&iaculis=risus&congue=semper&vivamus=porta&metus=volutpat&arcu=quam&adipiscing=pede&molestie=lobortis&hendrerit=ligula&at=sit&vulputate=amet&vitae=eleifend&nisl=pede&aenean=libero&lectus=quis&pellentesque=orci&eget=nullam&nunc=molestie&donec=nibh&quis=in&orci=lectus&eget=pellentesque&orci=at&vehicula=nulla&condimentum=suspendisse&curabitur=potenti&in=cras&libero=in&ut=purus&massa=eu&volutpat=magna&convallis=vulputate&morbi=luctus&odio=cum&odio=sociis&elementum=natoque&eu=penatibus&interdum=et&eu=magnis&tincidunt=dis&in=parturient&leo=montes&maecenas=nascetur&pulvinar=ridiculus&lobortis=mus&est=vivamus&phasellus=vestibulum&sit=sagittis&amet=sapien&erat=cum&nulla=sociis&tempus=natoque&vivamus=penatibus&in=et&felis=magnis&eu=dis&sapien=parturient&cursus=montes&vestibulum=nascetur&proin=ridiculus&eu=mus&mi=etiam&nulla=vel&ac=augue&enim=vestibulum&in=rutrum&tempor=rutrum&turpis=neque&nec=aenean"
                },
                "href": "https://cargocollective.com/at.xml?sapien=pede&cursus=justo&vestibulum=lacinia&proin=eget&eu=tincidunt&mi=eget&nulla=tempus&ac=vel&enim=pede&in=morbi&tempor=porttitor&turpis=lorem&nec=id&euismod=ligula&scelerisque=suspendisse&quam=ornare&turpis=consequat&adipiscing=lectus&lorem=in&vitae=est&mattis=risus&nibh=auctor&ligula=sed&nec=tristique&sem=in&duis=tempus&aliquam=sit&convallis=amet&nunc=sem&proin=fusce&at=consequat&turpis=nulla&a=nisl&pede=nunc&posuere=nisl&nonummy=duis&integer=bibendum&non=felis&velit=sed&donec=interdum&diam=venenatis&neque=turpis&vestibulum=enim&eget=blandit",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Marie-josée",
                "type": "artist",
                "uri": "https://irs.gov/ullamcorper/augue/a/suscipit/nulla/elit/ac.jpg?sit=morbi&amet=odio&sem=odio&fusce=elementum&consequat=eu&nulla=interdum&nisl=eu&nunc=tincidunt&nisl=in&duis=leo&bibendum=maecenas&felis=pulvinar&sed=lobortis&interdum=est&venenatis=phasellus&turpis=sit&enim=amet&blandit=erat&mi=nulla&in=tempus&porttitor=vivamus&pede=in&justo=felis&eu=eu&massa=sapien&donec=cursus&dapibus=vestibulum&duis=proin"
            }
        ],
        "available_markets": "LB"
    }, {
        "album_type": "Mr",
        "artists": [
            {
                "external_urls": {
                    "spotify": "http://lulu.com/posuere/felis/sed/lacus/morbi/sem/mauris.xml?at=ultricies&nulla=eu&suspendisse=nibh&potenti=quisque&cras=id&in=justo&purus=sit&eu=amet&magna=sapien&vulputate=dignissim&luctus=vestibulum&cum=vestibulum&sociis=ante&natoque=ipsum&penatibus=primis&et=in&magnis=faucibus&dis=orci&parturient=luctus&montes=et&nascetur=ultrices&ridiculus=posuere&mus=cubilia&vivamus=curae&vestibulum=nulla&sagittis=dapibus&sapien=dolor&cum=vel&sociis=est&natoque=donec&penatibus=odio&et=justo&magnis=sollicitudin&dis=ut&parturient=suscipit&montes=a&nascetur=feugiat&ridiculus=et&mus=eros&etiam=vestibulum&vel=ac&augue=est&vestibulum=lacinia&rutrum=nisi&rutrum=venenatis&neque=tristique&aenean=fusce&auctor=congue&gravida=diam&sem=id&praesent=ornare&id=imperdiet&massa=sapien&id=urna&nisl=pretium&venenatis=nisl&lacinia=ut&aenean=volutpat&sit=sapien&amet=arcu&justo=sed&morbi=augue&ut=aliquam"
                },
                "href": "http://wikimedia.org/turpis/adipiscing/lorem/vitae/mattis.html?ornare=quisque&consequat=id&lectus=justo&in=sit&est=amet&risus=sapien&auctor=dignissim&sed=vestibulum&tristique=vestibulum&in=ante&tempus=ipsum&sit=primis&amet=in&sem=faucibus&fusce=orci&consequat=luctus&nulla=et&nisl=ultrices&nunc=posuere&nisl=cubilia&duis=curae&bibendum=nulla&felis=dapibus&sed=dolor&interdum=vel&venenatis=est&turpis=donec&enim=odio&blandit=justo&mi=sollicitudin&in=ut&porttitor=suscipit&pede=a&justo=feugiat&eu=et&massa=eros&donec=vestibulum&dapibus=ac&duis=est&at=lacinia&velit=nisi&eu=venenatis&est=tristique&congue=fusce&elementum=congue&in=diam&hac=id&habitasse=ornare&platea=imperdiet&dictumst=sapien&morbi=urna&vestibulum=pretium&velit=nisl&id=ut&pretium=volutpat",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Garçon",
                "type": "artist",
                "uri": "http://prweb.com/elit/proin/risus/praesent/lectus/vestibulum/quam.js?nec=habitasse&nisi=platea&vulputate=dictumst&nonummy=morbi&maecenas=vestibulum&tincidunt=velit&lacus=id&at=pretium&velit=iaculis&vivamus=diam&vel=erat&nulla=fermentum&eget=justo&eros=nec&elementum=condimentum&pellentesque=neque&quisque=sapien&porta=placerat&volutpat=ante&erat=nulla&quisque=justo&erat=aliquam&eros=quis&viverra=turpis&eget=eget&congue=elit&eget=sodales&semper=scelerisque&rutrum=mauris&nulla=sit&nunc=amet&purus=eros&phasellus=suspendisse&in=accumsan&felis=tortor&donec=quis&semper=turpis&sapien=sed&a=ante&libero=vivamus&nam=tortor&dui=duis&proin=mattis&leo=egestas&odio=metus&porttitor=aenean&id=fermentum&consequat=donec&in=ut&consequat=mauris&ut=eget&nulla=massa&sed=tempor&accumsan=convallis&felis=nulla&ut=neque&at=libero&dolor=convallis&quis=eget&odio=eleifend&consequat=luctus&varius=ultricies&integer=eu&ac=nibh&leo=quisque&pellentesque=id&ultrices=justo&mattis=sit&odio=amet&donec=sapien&vitae=dignissim&nisi=vestibulum&nam=vestibulum&ultrices=ante&libero=ipsum&non=primis&mattis=in&pulvinar=faucibus&nulla=orci&pede=luctus&ullamcorper=et&augue=ultrices&a=posuere&suscipit=cubilia&nulla=curae&elit=nulla&ac=dapibus&nulla=dolor&sed=vel&vel=est&enim=donec&sit=odio&amet=justo&nunc=sollicitudin"
            }
        ],
        "available_markets": "HR"
    }, {
        "album_type": "Rev",
        "artists": [
            {
                "external_urls": {
                    "spotify": "https://jiathis.com/at/turpis/a.jpg?ante=vitae&ipsum=nisl&primis=aenean&in=lectus&faucibus=pellentesque&orci=eget&luctus=nunc&et=donec&ultrices=quis&posuere=orci&cubilia=eget&curae=orci&donec=vehicula&pharetra=condimentum&magna=curabitur"
                },
                "href": "http://exblog.jp/vel/accumsan.js?proin=metus&leo=aenean&odio=fermentum&porttitor=donec&id=ut&consequat=mauris&in=eget&consequat=massa&ut=tempor&nulla=convallis&sed=nulla&accumsan=neque&felis=libero&ut=convallis&at=eget&dolor=eleifend&quis=luctus&odio=ultricies&consequat=eu&varius=nibh&integer=quisque&ac=id&leo=justo&pellentesque=sit",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Mén",
                "type": "artist",
                "uri": "http://bloomberg.com/proin/at.png?erat=vel&fermentum=accumsan&justo=tellus&nec=nisi&condimentum=eu&neque=orci&sapien=mauris&placerat=lacinia&ante=sapien&nulla=quis&justo=libero&aliquam=nullam&quis=sit&turpis=amet&eget=turpis&elit=elementum&sodales=ligula&scelerisque=vehicula&mauris=consequat&sit=morbi&amet=a&eros=ipsum&suspendisse=integer&accumsan=a&tortor=nibh&quis=in&turpis=quis&sed=justo&ante=maecenas&vivamus=rhoncus&tortor=aliquam&duis=lacus&mattis=morbi&egestas=quis&metus=tortor&aenean=id"
            }
        ],
        "available_markets": "LU"
    }, {
        "album_type": "Honorable",
        "artists": [
            {
                "external_urls": {
                    "spotify": "http://usa.gov/luctus.aspx?ut=congue&tellus=risus&nulla=semper&ut=porta&erat=volutpat"
                },
                "href": "https://gov.uk/nisi/volutpat/eleifend/donec/ut/dolor.js?facilisi=augue&cras=a&non=suscipit&velit=nulla&nec=elit&nisi=ac&vulputate=nulla&nonummy=sed&maecenas=vel&tincidunt=enim&lacus=sit&at=amet&velit=nunc&vivamus=viverra&vel=dapibus&nulla=nulla&eget=suscipit&eros=ligula&elementum=in&pellentesque=lacus&quisque=curabitur&porta=at&volutpat=ipsum&erat=ac&quisque=tellus&erat=semper&eros=interdum&viverra=mauris&eget=ullamcorper&congue=purus&eget=sit&semper=amet&rutrum=nulla&nulla=quisque&nunc=arcu&purus=libero&phasellus=rutrum&in=ac&felis=lobortis&donec=vel&semper=dapibus&sapien=at&a=diam&libero=nam&nam=tristique&dui=tortor&proin=eu",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Märta",
                "type": "artist",
                "uri": "https://mit.edu/erat/volutpat.xml?quis=dignissim&justo=vestibulum&maecenas=vestibulum&rhoncus=ante&aliquam=ipsum&lacus=primis&morbi=in&quis=faucibus&tortor=orci&id=luctus&nulla=et&ultrices=ultrices&aliquet=posuere&maecenas=cubilia&leo=curae&odio=nulla&condimentum=dapibus&id=dolor&luctus=vel&nec=est&molestie=donec&sed=odio&justo=justo&pellentesque=sollicitudin&viverra=ut&pede=suscipit&ac=a&diam=feugiat&cras=et&pellentesque=eros&volutpat=vestibulum&dui=ac&maecenas=est&tristique=lacinia&est=nisi&et=venenatis&tempus=tristique&semper=fusce&est=congue&quam=diam&pharetra=id&magna=ornare&ac=imperdiet&consequat=sapien&metus=urna&sapien=pretium&ut=nisl&nunc=ut&vestibulum=volutpat&ante=sapien&ipsum=arcu&primis=sed&in=augue&faucibus=aliquam&orci=erat&luctus=volutpat&et=in&ultrices=congue&posuere=etiam&cubilia=justo&curae=etiam&mauris=pretium&viverra=iaculis&diam=justo&vitae=in&quam=hac&suspendisse=habitasse&potenti=platea&nullam=dictumst&porttitor=etiam&lacus=faucibus&at=cursus&turpis=urna&donec=ut&posuere=tellus&metus=nulla&vitae=ut&ipsum=erat&aliquam=id&non=mauris&mauris=vulputate&morbi=elementum&non=nullam&lectus=varius&aliquam=nulla&sit=facilisi&amet=cras&diam=non&in=velit&magna=nec&bibendum=nisi&imperdiet=vulputate&nullam=nonummy&orci=maecenas&pede=tincidunt"
            }
        ],
        "available_markets": "UA"
    }, {
        "album_type": "Honorable",
        "artists": [
            {
                "external_urls": {
                    "spotify": "https://engadget.com/vestibulum/ante.html?quisque=quam&porta=turpis&volutpat=adipiscing&erat=lorem&quisque=vitae&erat=mattis&eros=nibh&viverra=ligula&eget=nec&congue=sem&eget=duis&semper=aliquam&rutrum=convallis&nulla=nunc&nunc=proin&purus=at&phasellus=turpis&in=a&felis=pede&donec=posuere&semper=nonummy&sapien=integer&a=non&libero=velit&nam=donec&dui=diam&proin=neque&leo=vestibulum&odio=eget&porttitor=vulputate&id=ut&consequat=ultrices&in=vel&consequat=augue&ut=vestibulum&nulla=ante&sed=ipsum&accumsan=primis&felis=in&ut=faucibus&at=orci&dolor=luctus&quis=et&odio=ultrices&consequat=posuere&varius=cubilia&integer=curae&ac=donec&leo=pharetra&pellentesque=magna&ultrices=vestibulum&mattis=aliquet&odio=ultrices&donec=erat&vitae=tortor&nisi=sollicitudin&nam=mi&ultrices=sit&libero=amet&non=lobortis&mattis=sapien&pulvinar=sapien&nulla=non&pede=mi&ullamcorper=integer"
                },
                "href": "http://github.io/accumsan/felis.html?cras=erat&non=nulla&velit=tempus&nec=vivamus&nisi=in&vulputate=felis&nonummy=eu&maecenas=sapien",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Réservés",
                "type": "artist",
                "uri": "https://twitter.com/tellus/semper.jsp?curae=molestie&nulla=nibh&dapibus=in&dolor=lectus&vel=pellentesque&est=at&donec=nulla&odio=suspendisse&justo=potenti&sollicitudin=cras&ut=in&suscipit=purus&a=eu&feugiat=magna&et=vulputate&eros=luctus&vestibulum=cum&ac=sociis&est=natoque&lacinia=penatibus&nisi=et&venenatis=magnis&tristique=dis&fusce=parturient&congue=montes&diam=nascetur&id=ridiculus&ornare=mus&imperdiet=vivamus&sapien=vestibulum&urna=sagittis&pretium=sapien&nisl=cum&ut=sociis&volutpat=natoque&sapien=penatibus&arcu=et&sed=magnis&augue=dis&aliquam=parturient"
            }
        ],
        "available_markets": "CZ"
    }, {
        "album_type": "Mr",
        "artists": [
            {
                "external_urls": {
                    "spotify": "http://sogou.com/eget/nunc/donec/quis/orci/eget.json?tincidunt=leo&nulla=pellentesque&mollis=ultrices&molestie=mattis&lorem=odio&quisque=donec&ut=vitae&erat=nisi&curabitur=nam&gravida=ultrices&nisi=libero&at=non&nibh=mattis&in=pulvinar&hac=nulla&habitasse=pede&platea=ullamcorper&dictumst=augue&aliquam=a&augue=suscipit&quam=nulla&sollicitudin=elit&vitae=ac&consectetuer=nulla&eget=sed&rutrum=vel"
                },
                "href": "http://ed.gov/fermentum.xml?penatibus=orci&et=luctus&magnis=et&dis=ultrices&parturient=posuere&montes=cubilia&nascetur=curae&ridiculus=nulla&mus=dapibus&etiam=dolor&vel=vel&augue=est&vestibulum=donec&rutrum=odio&rutrum=justo&neque=sollicitudin&aenean=ut&auctor=suscipit&gravida=a&sem=feugiat&praesent=et&id=eros&massa=vestibulum&id=ac&nisl=est&venenatis=lacinia&lacinia=nisi&aenean=venenatis&sit=tristique&amet=fusce&justo=congue&morbi=diam&ut=id&odio=ornare&cras=imperdiet&mi=sapien&pede=urna&malesuada=pretium&in=nisl&imperdiet=ut&et=volutpat&commodo=sapien&vulputate=arcu&justo=sed&in=augue&blandit=aliquam&ultrices=erat&enim=volutpat&lorem=in&ipsum=congue&dolor=etiam&sit=justo",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Rachèle",
                "type": "artist",
                "uri": "http://amazon.com/donec/diam/neque/vestibulum.json?ante=vestibulum&ipsum=quam&primis=sapien&in=varius&faucibus=ut&orci=blandit&luctus=non&et=interdum&ultrices=in&posuere=ante&cubilia=vestibulum&curae=ante&nulla=ipsum&dapibus=primis&dolor=in&vel=faucibus&est=orci&donec=luctus&odio=et&justo=ultrices&sollicitudin=posuere&ut=cubilia&suscipit=curae&a=duis&feugiat=faucibus&et=accumsan&eros=odio&vestibulum=curabitur&ac=convallis&est=duis&lacinia=consequat&nisi=dui&venenatis=nec&tristique=nisi&fusce=volutpat&congue=eleifend&diam=donec&id=ut&ornare=dolor&imperdiet=morbi&sapien=vel&urna=lectus&pretium=in&nisl=quam&ut=fringilla&volutpat=rhoncus&sapien=mauris&arcu=enim&sed=leo&augue=rhoncus&aliquam=sed&erat=vestibulum&volutpat=sit&in=amet&congue=cursus&etiam=id&justo=turpis&etiam=integer&pretium=aliquet&iaculis=massa&justo=id&in=lobortis&hac=convallis&habitasse=tortor&platea=risus&dictumst=dapibus&etiam=augue&faucibus=vel&cursus=accumsan&urna=tellus&ut=nisi"
            }
        ],
        "available_markets": "IS"
    }, {
        "album_type": "Ms",
        "artists": [
            {
                "external_urls": {
                    "spotify": "http://hhs.gov/tortor/duis/mattis/egestas/metus/aenean.jpg?metus=cras&aenean=pellentesque&fermentum=volutpat&donec=dui&ut=maecenas&mauris=tristique&eget=est&massa=et&tempor=tempus&convallis=semper&nulla=est&neque=quam&libero=pharetra&convallis=magna&eget=ac&eleifend=consequat&luctus=metus&ultricies=sapien&eu=ut&nibh=nunc&quisque=vestibulum&id=ante&justo=ipsum&sit=primis&amet=in&sapien=faucibus&dignissim=orci&vestibulum=luctus&vestibulum=et&ante=ultrices&ipsum=posuere&primis=cubilia&in=curae&faucibus=mauris&orci=viverra&luctus=diam&et=vitae&ultrices=quam&posuere=suspendisse&cubilia=potenti&curae=nullam&nulla=porttitor&dapibus=lacus&dolor=at&vel=turpis&est=donec&donec=posuere&odio=metus&justo=vitae&sollicitudin=ipsum&ut=aliquam&suscipit=non&a=mauris&feugiat=morbi&et=non&eros=lectus&vestibulum=aliquam&ac=sit&est=amet&lacinia=diam&nisi=in&venenatis=magna&tristique=bibendum&fusce=imperdiet&congue=nullam&diam=orci&id=pede&ornare=venenatis&imperdiet=non&sapien=sodales&urna=sed&pretium=tincidunt&nisl=eu&ut=felis&volutpat=fusce&sapien=posuere&arcu=felis&sed=sed&augue=lacus&aliquam=morbi&erat=sem&volutpat=mauris&in=laoreet&congue=ut&etiam=rhoncus&justo=aliquet&etiam=pulvinar&pretium=sed&iaculis=nisl&justo=nunc&in=rhoncus&hac=dui&habitasse=vel"
                },
                "href": "https://cnn.com/urna/pretium/nisl/ut/volutpat/sapien.xml?consequat=nam&dui=ultrices&nec=libero&nisi=non&volutpat=mattis&eleifend=pulvinar&donec=nulla&ut=pede&dolor=ullamcorper&morbi=augue&vel=a&lectus=suscipit&in=nulla&quam=elit&fringilla=ac&rhoncus=nulla&mauris=sed&enim=vel&leo=enim&rhoncus=sit&sed=amet&vestibulum=nunc&sit=viverra&amet=dapibus&cursus=nulla&id=suscipit&turpis=ligula&integer=in&aliquet=lacus&massa=curabitur&id=at&lobortis=ipsum&convallis=ac&tortor=tellus&risus=semper&dapibus=interdum&augue=mauris&vel=ullamcorper&accumsan=purus&tellus=sit&nisi=amet&eu=nulla&orci=quisque&mauris=arcu&lacinia=libero&sapien=rutrum&quis=ac&libero=lobortis&nullam=vel&sit=dapibus&amet=at&turpis=diam&elementum=nam&ligula=tristique&vehicula=tortor&consequat=eu&morbi=pede",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Méthode",
                "type": "artist",
                "uri": "http://hhs.gov/sagittis/nam.jpg?justo=hac"
            }
        ],
        "available_markets": "AG"
    }, {
        "album_type": "Rev",
        "artists": [
            {
                "external_urls": {
                    "spotify": "https://shutterfly.com/imperdiet/et/commodo/vulputate/justo.xml?cubilia=duis&curae=bibendum&nulla=morbi&dapibus=non&dolor=quam&vel=nec&est=dui&donec=luctus&odio=rutrum&justo=nulla&sollicitudin=tellus&ut=in&suscipit=sagittis&a=dui&feugiat=vel&et=nisl"
                },
                "href": "https://istockphoto.com/quam/pharetra/magna/ac/consequat.aspx?suspendisse=sapien&potenti=a&cras=libero&in=nam&purus=dui&eu=proin&magna=leo&vulputate=odio&luctus=porttitor&cum=id&sociis=consequat&natoque=in&penatibus=consequat&et=ut&magnis=nulla&dis=sed&parturient=accumsan&montes=felis&nascetur=ut&ridiculus=at&mus=dolor&vivamus=quis&vestibulum=odio&sagittis=consequat&sapien=varius&cum=integer&sociis=ac&natoque=leo&penatibus=pellentesque&et=ultrices&magnis=mattis&dis=odio&parturient=donec&montes=vitae&nascetur=nisi&ridiculus=nam&mus=ultrices&etiam=libero&vel=non&augue=mattis&vestibulum=pulvinar&rutrum=nulla",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Céline",
                "type": "artist",
                "uri": "http://columbia.edu/lobortis/convallis/tortor.jpg?interdum=orci&eu=eget&tincidunt=orci&in=vehicula&leo=condimentum&maecenas=curabitur&pulvinar=in&lobortis=libero&est=ut&phasellus=massa&sit=volutpat&amet=convallis&erat=morbi&nulla=odio&tempus=odio&vivamus=elementum&in=eu&felis=interdum&eu=eu&sapien=tincidunt&cursus=in&vestibulum=leo&proin=maecenas&eu=pulvinar&mi=lobortis&nulla=est&ac=phasellus&enim=sit&in=amet&tempor=erat&turpis=nulla&nec=tempus&euismod=vivamus&scelerisque=in&quam=felis&turpis=eu&adipiscing=sapien&lorem=cursus&vitae=vestibulum&mattis=proin&nibh=eu&ligula=mi&nec=nulla&sem=ac&duis=enim&aliquam=in&convallis=tempor&nunc=turpis&proin=nec&at=euismod&turpis=scelerisque&a=quam&pede=turpis&posuere=adipiscing&nonummy=lorem&integer=vitae&non=mattis&velit=nibh&donec=ligula"
            }
        ],
        "available_markets": "AU"
    }, {
        "album_type": "Mr",
        "artists": [
            {
                "external_urls": {
                    "spotify": "http://google.pl/ut/tellus.html?at=at&lorem=nunc&integer=commodo&tincidunt=placerat&ante=praesent&vel=blandit&ipsum=nam&praesent=nulla&blandit=integer&lacinia=pede&erat=justo&vestibulum=lacinia&sed=eget&magna=tincidunt&at=eget&nunc=tempus&commodo=vel&placerat=pede&praesent=morbi&blandit=porttitor&nam=lorem&nulla=id&integer=ligula&pede=suspendisse&justo=ornare&lacinia=consequat&eget=lectus&tincidunt=in&eget=est&tempus=risus&vel=auctor&pede=sed&morbi=tristique&porttitor=in&lorem=tempus&id=sit&ligula=amet&suspendisse=sem&ornare=fusce&consequat=consequat&lectus=nulla&in=nisl&est=nunc&risus=nisl&auctor=duis"
                },
                "href": "http://dailymotion.com/felis/ut/at.jpg?augue=urna&quam=pretium&sollicitudin=nisl&vitae=ut&consectetuer=volutpat&eget=sapien&rutrum=arcu&at=sed&lorem=augue&integer=aliquam&tincidunt=erat&ante=volutpat&vel=in&ipsum=congue&praesent=etiam&blandit=justo&lacinia=etiam&erat=pretium&vestibulum=iaculis&sed=justo&magna=in&at=hac&nunc=habitasse&commodo=platea&placerat=dictumst&praesent=etiam&blandit=faucibus&nam=cursus&nulla=urna&integer=ut&pede=tellus&justo=nulla&lacinia=ut&eget=erat&tincidunt=id&eget=mauris&tempus=vulputate&vel=elementum&pede=nullam&morbi=varius&porttitor=nulla",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Björn",
                "type": "artist",
                "uri": "https://usda.gov/eu/orci/mauris/lacinia.png?diam=rhoncus&cras=aliquet&pellentesque=pulvinar&volutpat=sed&dui=nisl&maecenas=nunc&tristique=rhoncus&est=dui&et=vel&tempus=sem&semper=sed&est=sagittis&quam=nam&pharetra=congue&magna=risus&ac=semper&consequat=porta&metus=volutpat&sapien=quam&ut=pede&nunc=lobortis&vestibulum=ligula&ante=sit&ipsum=amet&primis=eleifend&in=pede&faucibus=libero&orci=quis&luctus=orci&et=nullam&ultrices=molestie&posuere=nibh&cubilia=in&curae=lectus&mauris=pellentesque&viverra=at&diam=nulla&vitae=suspendisse&quam=potenti&suspendisse=cras&potenti=in&nullam=purus&porttitor=eu&lacus=magna&at=vulputate&turpis=luctus&donec=cum&posuere=sociis&metus=natoque&vitae=penatibus&ipsum=et&aliquam=magnis&non=dis&mauris=parturient&morbi=montes&non=nascetur&lectus=ridiculus&aliquam=mus&sit=vivamus&amet=vestibulum&diam=sagittis&in=sapien&magna=cum&bibendum=sociis&imperdiet=natoque&nullam=penatibus&orci=et&pede=magnis&venenatis=dis&non=parturient&sodales=montes&sed=nascetur&tincidunt=ridiculus&eu=mus&felis=etiam&fusce=vel&posuere=augue&felis=vestibulum&sed=rutrum&lacus=rutrum&morbi=neque&sem=aenean&mauris=auctor&laoreet=gravida&ut=sem&rhoncus=praesent&aliquet=id&pulvinar=massa&sed=id&nisl=nisl&nunc=venenatis&rhoncus=lacinia"
            }
        ],
        "available_markets": "HU"
    }, {
        "album_type": "Mr",
        "artists": [
            {
                "external_urls": {
                    "spotify": "https://booking.com/ac/enim/in/tempor.png?aliquet=magna&at=vestibulum&feugiat=aliquet&non=ultrices&pretium=erat&quis=tortor&lectus=sollicitudin&suspendisse=mi&potenti=sit&in=amet&eleifend=lobortis&quam=sapien&a=sapien&odio=non&in=mi&hac=integer&habitasse=ac&platea=neque&dictumst=duis&maecenas=bibendum&ut=morbi&massa=non&quis=quam&augue=nec&luctus=dui&tincidunt=luctus&nulla=rutrum&mollis=nulla&molestie=tellus&lorem=in&quisque=sagittis&ut=dui&erat=vel&curabitur=nisl&gravida=duis&nisi=ac&at=nibh&nibh=fusce&in=lacus&hac=purus&habitasse=aliquet&platea=at&dictumst=feugiat&aliquam=non&augue=pretium&quam=quis&sollicitudin=lectus&vitae=suspendisse&consectetuer=potenti&eget=in&rutrum=eleifend&at=quam&lorem=a&integer=odio&tincidunt=in&ante=hac&vel=habitasse&ipsum=platea&praesent=dictumst&blandit=maecenas&lacinia=ut&erat=massa&vestibulum=quis&sed=augue&magna=luctus&at=tincidunt&nunc=nulla&commodo=mollis&placerat=molestie&praesent=lorem&blandit=quisque&nam=ut&nulla=erat&integer=curabitur&pede=gravida&justo=nisi&lacinia=at&eget=nibh&tincidunt=in&eget=hac&tempus=habitasse&vel=platea&pede=dictumst&morbi=aliquam&porttitor=augue&lorem=quam&id=sollicitudin&ligula=vitae&suspendisse=consectetuer&ornare=eget&consequat=rutrum"
                },
                "href": "https://nih.gov/nascetur/ridiculus/mus/etiam/vel/augue/vestibulum.aspx?amet=elit&sapien=ac&dignissim=nulla&vestibulum=sed&vestibulum=vel&ante=enim&ipsum=sit&primis=amet&in=nunc&faucibus=viverra&orci=dapibus&luctus=nulla&et=suscipit&ultrices=ligula&posuere=in&cubilia=lacus&curae=curabitur&nulla=at&dapibus=ipsum&dolor=ac&vel=tellus&est=semper&donec=interdum&odio=mauris&justo=ullamcorper&sollicitudin=purus&ut=sit&suscipit=amet&a=nulla&feugiat=quisque",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Eugénie",
                "type": "artist",
                "uri": "http://abc.net.au/ipsum/integer/a/nibh.json?sit=placerat&amet=praesent&turpis=blandit&elementum=nam&ligula=nulla&vehicula=integer&consequat=pede&morbi=justo&a=lacinia&ipsum=eget&integer=tincidunt&a=eget&nibh=tempus&in=vel&quis=pede&justo=morbi&maecenas=porttitor&rhoncus=lorem&aliquam=id&lacus=ligula&morbi=suspendisse&quis=ornare&tortor=consequat"
            }
        ],
        "available_markets": "PE"
    }, {
        "album_type": "Mrs",
        "artists": [
            {
                "external_urls": {
                    "spotify": "https://nature.com/fusce/lacus/purus/aliquet/at/feugiat/non.png?magnis=ligula&dis=pellentesque&parturient=ultrices&montes=phasellus&nascetur=id&ridiculus=sapien&mus=in&vivamus=sapien&vestibulum=iaculis&sagittis=congue&sapien=vivamus&cum=metus&sociis=arcu&natoque=adipiscing&penatibus=molestie&et=hendrerit&magnis=at&dis=vulputate&parturient=vitae&montes=nisl&nascetur=aenean&ridiculus=lectus&mus=pellentesque&etiam=eget&vel=nunc&augue=donec&vestibulum=quis&rutrum=orci&rutrum=eget&neque=orci&aenean=vehicula&auctor=condimentum&gravida=curabitur&sem=in&praesent=libero&id=ut&massa=massa&id=volutpat&nisl=convallis&venenatis=morbi&lacinia=odio&aenean=odio&sit=elementum&amet=eu&justo=interdum&morbi=eu&ut=tincidunt&odio=in&cras=leo&mi=maecenas&pede=pulvinar&malesuada=lobortis&in=est&imperdiet=phasellus&et=sit&commodo=amet&vulputate=erat&justo=nulla&in=tempus&blandit=vivamus&ultrices=in&enim=felis&lorem=eu&ipsum=sapien&dolor=cursus&sit=vestibulum&amet=proin&consectetuer=eu&adipiscing=mi&elit=nulla&proin=ac&interdum=enim&mauris=in&non=tempor&ligula=turpis&pellentesque=nec&ultrices=euismod&phasellus=scelerisque"
                },
                "href": "https://ft.com/lobortis/sapien/sapien/non/mi/integer.jpg?odio=amet&cras=lobortis&mi=sapien&pede=sapien&malesuada=non&in=mi&imperdiet=integer&et=ac&commodo=neque&vulputate=duis&justo=bibendum&in=morbi&blandit=non&ultrices=quam&enim=nec&lorem=dui&ipsum=luctus&dolor=rutrum&sit=nulla&amet=tellus&consectetuer=in&adipiscing=sagittis&elit=dui&proin=vel&interdum=nisl&mauris=duis&non=ac&ligula=nibh&pellentesque=fusce&ultrices=lacus&phasellus=purus&id=aliquet&sapien=at&in=feugiat&sapien=non&iaculis=pretium",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Eléa",
                "type": "artist",
                "uri": "https://deliciousdays.com/vestibulum/eget/vulputate/ut/ultrices.jsp?at=magna&turpis=vestibulum&donec=aliquet&posuere=ultrices&metus=erat&vitae=tortor&ipsum=sollicitudin&aliquam=mi&non=sit&mauris=amet&morbi=lobortis&non=sapien&lectus=sapien&aliquam=non&sit=mi&amet=integer&diam=ac&in=neque&magna=duis&bibendum=bibendum&imperdiet=morbi&nullam=non&orci=quam&pede=nec&venenatis=dui&non=luctus"
            }
        ],
        "available_markets": "BE"
    }, {
        "album_type": "Dr",
        "artists": [
            {
                "external_urls": {
                    "spotify": "https://telegraph.co.uk/id/consequat/in/consequat/ut/nulla/sed.aspx?quam=cras&a=pellentesque&odio=volutpat&in=dui&hac=maecenas&habitasse=tristique&platea=est&dictumst=et&maecenas=tempus&ut=semper&massa=est&quis=quam&augue=pharetra&luctus=magna&tincidunt=ac&nulla=consequat&mollis=metus&molestie=sapien&lorem=ut&quisque=nunc&ut=vestibulum&erat=ante&curabitur=ipsum&gravida=primis&nisi=in&at=faucibus&nibh=orci&in=luctus&hac=et&habitasse=ultrices&platea=posuere&dictumst=cubilia&aliquam=curae&augue=mauris&quam=viverra&sollicitudin=diam&vitae=vitae&consectetuer=quam&eget=suspendisse&rutrum=potenti&at=nullam&lorem=porttitor&integer=lacus&tincidunt=at&ante=turpis&vel=donec&ipsum=posuere&praesent=metus&blandit=vitae&lacinia=ipsum&erat=aliquam&vestibulum=non&sed=mauris&magna=morbi"
                },
                "href": "https://imdb.com/posuere/felis/sed/lacus/morbi.js?quam=in&turpis=purus&adipiscing=eu&lorem=magna&vitae=vulputate&mattis=luctus&nibh=cum&ligula=sociis&nec=natoque&sem=penatibus&duis=et&aliquam=magnis&convallis=dis&nunc=parturient&proin=montes&at=nascetur&turpis=ridiculus&a=mus&pede=vivamus&posuere=vestibulum&nonummy=sagittis&integer=sapien&non=cum&velit=sociis&donec=natoque&diam=penatibus&neque=et&vestibulum=magnis&eget=dis&vulputate=parturient&ut=montes&ultrices=nascetur&vel=ridiculus&augue=mus&vestibulum=etiam&ante=vel&ipsum=augue&primis=vestibulum&in=rutrum&faucibus=rutrum&orci=neque",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Pénélope",
                "type": "artist",
                "uri": "https://home.pl/nulla.jsp?lorem=et&ipsum=commodo&dolor=vulputate&sit=justo&amet=in&consectetuer=blandit&adipiscing=ultrices&elit=enim&proin=lorem&risus=ipsum&praesent=dolor&lectus=sit&vestibulum=amet&quam=consectetuer&sapien=adipiscing&varius=elit&ut=proin&blandit=interdum&non=mauris&interdum=non&in=ligula&ante=pellentesque&vestibulum=ultrices&ante=phasellus&ipsum=id&primis=sapien&in=in&faucibus=sapien&orci=iaculis&luctus=congue&et=vivamus&ultrices=metus&posuere=arcu&cubilia=adipiscing&curae=molestie&duis=hendrerit&faucibus=at&accumsan=vulputate&odio=vitae&curabitur=nisl&convallis=aenean&duis=lectus&consequat=pellentesque&dui=eget&nec=nunc&nisi=donec&volutpat=quis&eleifend=orci&donec=eget&ut=orci&dolor=vehicula&morbi=condimentum&vel=curabitur&lectus=in&in=libero&quam=ut&fringilla=massa&rhoncus=volutpat&mauris=convallis&enim=morbi&leo=odio&rhoncus=odio&sed=elementum&vestibulum=eu&sit=interdum&amet=eu&cursus=tincidunt&id=in&turpis=leo&integer=maecenas&aliquet=pulvinar&massa=lobortis&id=est&lobortis=phasellus&convallis=sit&tortor=amet&risus=erat&dapibus=nulla&augue=tempus&vel=vivamus&accumsan=in&tellus=felis&nisi=eu&eu=sapien&orci=cursus&mauris=vestibulum&lacinia=proin&sapien=eu&quis=mi&libero=nulla&nullam=ac&sit=enim&amet=in&turpis=tempor&elementum=turpis&ligula=nec"
            }
        ],
        "available_markets": "CA"
    }, {
        "album_type": "Ms",
        "artists": [
            {
                "external_urls": {
                    "spotify": "https://usda.gov/tellus/nulla/ut.js?rutrum=augue&nulla=quam&tellus=sollicitudin&in=vitae&sagittis=consectetuer&dui=eget&vel=rutrum&nisl=at&duis=lorem&ac=integer&nibh=tincidunt&fusce=ante&lacus=vel&purus=ipsum&aliquet=praesent&at=blandit&feugiat=lacinia"
                },
                "href": "https://msu.edu/erat.html?cursus=amet&id=erat&turpis=nulla&integer=tempus",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Félicie",
                "type": "artist",
                "uri": "https://liveinternet.ru/sapien.json?faucibus=sem&orci=praesent&luctus=id&et=massa&ultrices=id&posuere=nisl&cubilia=venenatis&curae=lacinia&mauris=aenean&viverra=sit&diam=amet&vitae=justo&quam=morbi&suspendisse=ut&potenti=odio&nullam=cras&porttitor=mi&lacus=pede&at=malesuada&turpis=in&donec=imperdiet&posuere=et&metus=commodo&vitae=vulputate&ipsum=justo&aliquam=in&non=blandit&mauris=ultrices&morbi=enim&non=lorem&lectus=ipsum&aliquam=dolor&sit=sit&amet=amet&diam=consectetuer&in=adipiscing&magna=elit&bibendum=proin&imperdiet=interdum&nullam=mauris&orci=non&pede=ligula&venenatis=pellentesque&non=ultrices&sodales=phasellus&sed=id&tincidunt=sapien&eu=in&felis=sapien&fusce=iaculis"
            }
        ],
        "available_markets": "UY"
    }, {
        "album_type": "Ms",
        "artists": [
            {
                "external_urls": {
                    "spotify": "http://cbslocal.com/eu/felis/fusce/posuere/felis/sed.png?tortor=rhoncus&duis=sed&mattis=vestibulum&egestas=sit&metus=amet&aenean=cursus&fermentum=id&donec=turpis&ut=integer&mauris=aliquet&eget=massa&massa=id&tempor=lobortis&convallis=convallis&nulla=tortor&neque=risus&libero=dapibus&convallis=augue&eget=vel&eleifend=accumsan&luctus=tellus&ultricies=nisi&eu=eu&nibh=orci&quisque=mauris&id=lacinia&justo=sapien&sit=quis&amet=libero&sapien=nullam&dignissim=sit&vestibulum=amet&vestibulum=turpis&ante=elementum&ipsum=ligula&primis=vehicula&in=consequat&faucibus=morbi&orci=a&luctus=ipsum&et=integer&ultrices=a&posuere=nibh&cubilia=in&curae=quis&nulla=justo&dapibus=maecenas&dolor=rhoncus&vel=aliquam&est=lacus&donec=morbi&odio=quis&justo=tortor&sollicitudin=id&ut=nulla&suscipit=ultrices&a=aliquet&feugiat=maecenas&et=leo&eros=odio&vestibulum=condimentum&ac=id&est=luctus&lacinia=nec&nisi=molestie&venenatis=sed&tristique=justo&fusce=pellentesque&congue=viverra&diam=pede&id=ac&ornare=diam&imperdiet=cras&sapien=pellentesque&urna=volutpat&pretium=dui&nisl=maecenas&ut=tristique&volutpat=est&sapien=et&arcu=tempus&sed=semper&augue=est&aliquam=quam"
                },
                "href": "http://narod.ru/tortor/sollicitudin/mi/sit/amet/lobortis.png?id=eget&luctus=tempus&nec=vel&molestie=pede&sed=morbi&justo=porttitor&pellentesque=lorem&viverra=id&pede=ligula&ac=suspendisse&diam=ornare&cras=consequat&pellentesque=lectus&volutpat=in&dui=est&maecenas=risus&tristique=auctor&est=sed&et=tristique&tempus=in&semper=tempus&est=sit&quam=amet&pharetra=sem&magna=fusce&ac=consequat&consequat=nulla&metus=nisl&sapien=nunc&ut=nisl&nunc=duis&vestibulum=bibendum&ante=felis&ipsum=sed&primis=interdum&in=venenatis&faucibus=turpis&orci=enim&luctus=blandit&et=mi&ultrices=in&posuere=porttitor&cubilia=pede&curae=justo&mauris=eu&viverra=massa&diam=donec&vitae=dapibus&quam=duis&suspendisse=at&potenti=velit&nullam=eu&porttitor=est&lacus=congue&at=elementum&turpis=in&donec=hac&posuere=habitasse&metus=platea&vitae=dictumst&ipsum=morbi&aliquam=vestibulum&non=velit&mauris=id&morbi=pretium&non=iaculis&lectus=diam&aliquam=erat&sit=fermentum&amet=justo&diam=nec&in=condimentum&magna=neque",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Loïc",
                "type": "artist",
                "uri": "http://economist.com/eros/elementum/pellentesque/quisque.aspx?blandit=ipsum&lacinia=dolor&erat=sit&vestibulum=amet&sed=consectetuer&magna=adipiscing&at=elit&nunc=proin&commodo=risus&placerat=praesent&praesent=lectus&blandit=vestibulum&nam=quam&nulla=sapien&integer=varius&pede=ut&justo=blandit&lacinia=non&eget=interdum&tincidunt=in&eget=ante&tempus=vestibulum&vel=ante&pede=ipsum&morbi=primis&porttitor=in&lorem=faucibus&id=orci&ligula=luctus&suspendisse=et&ornare=ultrices&consequat=posuere&lectus=cubilia&in=curae&est=duis&risus=faucibus&auctor=accumsan&sed=odio&tristique=curabitur&in=convallis&tempus=duis&sit=consequat&amet=dui&sem=nec&fusce=nisi&consequat=volutpat"
            }
        ],
        "available_markets": "IT"
    }, {
        "album_type": "Ms",
        "artists": [
            {
                "external_urls": {
                    "spotify": "https://hud.gov/nibh/in.html?pede=eu&justo=est&lacinia=congue&eget=elementum&tincidunt=in&eget=hac&tempus=habitasse&vel=platea&pede=dictumst&morbi=morbi&porttitor=vestibulum&lorem=velit&id=id&ligula=pretium&suspendisse=iaculis&ornare=diam&consequat=erat&lectus=fermentum&in=justo&est=nec&risus=condimentum&auctor=neque&sed=sapien"
                },
                "href": "http://printfriendly.com/odio/donec/vitae/nisi.html?massa=eu&id=mi&lobortis=nulla&convallis=ac&tortor=enim&risus=in&dapibus=tempor&augue=turpis&vel=nec&accumsan=euismod&tellus=scelerisque&nisi=quam&eu=turpis&orci=adipiscing&mauris=lorem&lacinia=vitae&sapien=mattis&quis=nibh&libero=ligula&nullam=nec&sit=sem&amet=duis&turpis=aliquam&elementum=convallis&ligula=nunc&vehicula=proin&consequat=at&morbi=turpis&a=a&ipsum=pede&integer=posuere&a=nonummy&nibh=integer&in=non&quis=velit&justo=donec&maecenas=diam&rhoncus=neque&aliquam=vestibulum&lacus=eget&morbi=vulputate&quis=ut&tortor=ultrices&id=vel&nulla=augue&ultrices=vestibulum&aliquet=ante&maecenas=ipsum&leo=primis&odio=in&condimentum=faucibus&id=orci&luctus=luctus&nec=et&molestie=ultrices&sed=posuere&justo=cubilia&pellentesque=curae&viverra=donec&pede=pharetra&ac=magna",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Félicie",
                "type": "artist",
                "uri": "http://sakura.ne.jp/pulvinar/sed/nisl/nunc/rhoncus/dui.js?nulla=sit&tempus=amet&vivamus=eros&in=suspendisse&felis=accumsan&eu=tortor&sapien=quis&cursus=turpis&vestibulum=sed&proin=ante&eu=vivamus&mi=tortor&nulla=duis&ac=mattis&enim=egestas&in=metus&tempor=aenean&turpis=fermentum&nec=donec&euismod=ut&scelerisque=mauris&quam=eget&turpis=massa&adipiscing=tempor&lorem=convallis&vitae=nulla&mattis=neque&nibh=libero&ligula=convallis&nec=eget&sem=eleifend&duis=luctus&aliquam=ultricies&convallis=eu&nunc=nibh&proin=quisque&at=id&turpis=justo&a=sit&pede=amet&posuere=sapien&nonummy=dignissim&integer=vestibulum&non=vestibulum&velit=ante&donec=ipsum&diam=primis&neque=in&vestibulum=faucibus&eget=orci&vulputate=luctus&ut=et&ultrices=ultrices&vel=posuere&augue=cubilia&vestibulum=curae&ante=nulla&ipsum=dapibus&primis=dolor&in=vel&faucibus=est&orci=donec&luctus=odio&et=justo&ultrices=sollicitudin&posuere=ut&cubilia=suscipit&curae=a&donec=feugiat&pharetra=et&magna=eros&vestibulum=vestibulum&aliquet=ac&ultrices=est&erat=lacinia&tortor=nisi&sollicitudin=venenatis&mi=tristique"
            }
        ],
        "available_markets": "QA"
    }, {
        "album_type": "Rev",
        "artists": [
            {
                "external_urls": {
                    "spotify": "https://yellowbook.com/amet/cursus/id.aspx?mi=convallis&sit=morbi&amet=odio&lobortis=odio&sapien=elementum&sapien=eu&non=interdum&mi=eu&integer=tincidunt&ac=in&neque=leo&duis=maecenas&bibendum=pulvinar&morbi=lobortis&non=est&quam=phasellus&nec=sit&dui=amet&luctus=erat&rutrum=nulla&nulla=tempus&tellus=vivamus&in=in&sagittis=felis&dui=eu&vel=sapien&nisl=cursus&duis=vestibulum&ac=proin&nibh=eu&fusce=mi&lacus=nulla&purus=ac&aliquet=enim&at=in&feugiat=tempor&non=turpis&pretium=nec&quis=euismod&lectus=scelerisque&suspendisse=quam&potenti=turpis&in=adipiscing&eleifend=lorem&quam=vitae&a=mattis&odio=nibh&in=ligula&hac=nec&habitasse=sem&platea=duis&dictumst=aliquam&maecenas=convallis&ut=nunc&massa=proin&quis=at&augue=turpis&luctus=a&tincidunt=pede&nulla=posuere&mollis=nonummy&molestie=integer&lorem=non&quisque=velit&ut=donec&erat=diam&curabitur=neque"
                },
                "href": "http://360.cn/eu/pede.aspx?id=posuere&ligula=cubilia&suspendisse=curae&ornare=nulla&consequat=dapibus&lectus=dolor&in=vel&est=est&risus=donec&auctor=odio&sed=justo&tristique=sollicitudin&in=ut&tempus=suscipit&sit=a&amet=feugiat&sem=et&fusce=eros&consequat=vestibulum&nulla=ac&nisl=est&nunc=lacinia&nisl=nisi&duis=venenatis&bibendum=tristique&felis=fusce&sed=congue",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Gösta",
                "type": "artist",
                "uri": "https://deliciousdays.com/lorem/id.aspx?in=integer&faucibus=a&orci=nibh&luctus=in&et=quis&ultrices=justo&posuere=maecenas&cubilia=rhoncus&curae=aliquam&mauris=lacus&viverra=morbi&diam=quis&vitae=tortor&quam=id&suspendisse=nulla&potenti=ultrices&nullam=aliquet&porttitor=maecenas&lacus=leo&at=odio&turpis=condimentum&donec=id&posuere=luctus&metus=nec&vitae=molestie&ipsum=sed&aliquam=justo&non=pellentesque&mauris=viverra&morbi=pede&non=ac&lectus=diam&aliquam=cras&sit=pellentesque&amet=volutpat&diam=dui&in=maecenas&magna=tristique&bibendum=est&imperdiet=et&nullam=tempus&orci=semper&pede=est&venenatis=quam"
            }
        ],
        "available_markets": "PY"
    }, {
        "album_type": "Honorable",
        "artists": [
            {
                "external_urls": {
                    "spotify": "http://google.fr/aliquam/erat/volutpat/in/congue.jpg?amet=faucibus&nunc=cursus&viverra=urna&dapibus=ut&nulla=tellus&suscipit=nulla&ligula=ut&in=erat&lacus=id&curabitur=mauris&at=vulputate&ipsum=elementum&ac=nullam&tellus=varius&semper=nulla&interdum=facilisi&mauris=cras&ullamcorper=non&purus=velit&sit=nec&amet=nisi&nulla=vulputate&quisque=nonummy&arcu=maecenas&libero=tincidunt&rutrum=lacus&ac=at&lobortis=velit&vel=vivamus&dapibus=vel&at=nulla&diam=eget&nam=eros"
                },
                "href": "http://un.org/libero/convallis.html?blandit=vehicula&nam=consequat&nulla=morbi&integer=a&pede=ipsum",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Göran",
                "type": "artist",
                "uri": "http://dion.ne.jp/sit/amet/erat.jpg?luctus=quis&rutrum=libero&nulla=nullam&tellus=sit&in=amet&sagittis=turpis&dui=elementum&vel=ligula&nisl=vehicula&duis=consequat&ac=morbi&nibh=a&fusce=ipsum&lacus=integer&purus=a&aliquet=nibh&at=in&feugiat=quis&non=justo&pretium=maecenas&quis=rhoncus&lectus=aliquam&suspendisse=lacus&potenti=morbi&in=quis&eleifend=tortor&quam=id&a=nulla&odio=ultrices&in=aliquet&hac=maecenas&habitasse=leo&platea=odio&dictumst=condimentum&maecenas=id&ut=luctus&massa=nec&quis=molestie&augue=sed&luctus=justo&tincidunt=pellentesque&nulla=viverra&mollis=pede&molestie=ac&lorem=diam&quisque=cras&ut=pellentesque&erat=volutpat&curabitur=dui&gravida=maecenas&nisi=tristique&at=est&nibh=et&in=tempus&hac=semper&habitasse=est&platea=quam"
            }
        ],
        "available_markets": "MY"
    }, {
        "album_type": "Dr",
        "artists": [
            {
                "external_urls": {
                    "spotify": "http://fastcompany.com/nunc.js?magnis=sapien&dis=dignissim&parturient=vestibulum&montes=vestibulum&nascetur=ante&ridiculus=ipsum&mus=primis&etiam=in&vel=faucibus&augue=orci&vestibulum=luctus&rutrum=et&rutrum=ultrices&neque=posuere&aenean=cubilia&auctor=curae&gravida=nulla&sem=dapibus&praesent=dolor&id=vel&massa=est&id=donec&nisl=odio&venenatis=justo&lacinia=sollicitudin&aenean=ut&sit=suscipit&amet=a&justo=feugiat&morbi=et&ut=eros&odio=vestibulum&cras=ac&mi=est&pede=lacinia&malesuada=nisi&in=venenatis&imperdiet=tristique&et=fusce&commodo=congue&vulputate=diam&justo=id&in=ornare&blandit=imperdiet&ultrices=sapien&enim=urna&lorem=pretium&ipsum=nisl&dolor=ut&sit=volutpat&amet=sapien&consectetuer=arcu&adipiscing=sed&elit=augue&proin=aliquam&interdum=erat&mauris=volutpat&non=in&ligula=congue&pellentesque=etiam&ultrices=justo&phasellus=etiam&id=pretium&sapien=iaculis&in=justo&sapien=in&iaculis=hac&congue=habitasse&vivamus=platea&metus=dictumst&arcu=etiam&adipiscing=faucibus&molestie=cursus&hendrerit=urna&at=ut&vulputate=tellus&vitae=nulla&nisl=ut&aenean=erat&lectus=id&pellentesque=mauris&eget=vulputate&nunc=elementum"
                },
                "href": "http://reverbnation.com/morbi/odio/odio/elementum/eu.jsp?pretium=ultrices&iaculis=phasellus&justo=id&in=sapien&hac=in&habitasse=sapien&platea=iaculis&dictumst=congue&etiam=vivamus&faucibus=metus&cursus=arcu",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Naéva",
                "type": "artist",
                "uri": "http://wisc.edu/diam/vitae/quam/suspendisse/potenti/nullam.png?consequat=turpis&dui=nec&nec=euismod&nisi=scelerisque&volutpat=quam&eleifend=turpis&donec=adipiscing&ut=lorem&dolor=vitae&morbi=mattis&vel=nibh&lectus=ligula&in=nec&quam=sem&fringilla=duis&rhoncus=aliquam&mauris=convallis&enim=nunc&leo=proin&rhoncus=at&sed=turpis&vestibulum=a&sit=pede&amet=posuere&cursus=nonummy&id=integer&turpis=non&integer=velit&aliquet=donec&massa=diam&id=neque&lobortis=vestibulum&convallis=eget&tortor=vulputate&risus=ut&dapibus=ultrices&augue=vel&vel=augue&accumsan=vestibulum&tellus=ante&nisi=ipsum&eu=primis&orci=in&mauris=faucibus&lacinia=orci&sapien=luctus&quis=et&libero=ultrices&nullam=posuere&sit=cubilia&amet=curae&turpis=donec&elementum=pharetra&ligula=magna&vehicula=vestibulum&consequat=aliquet&morbi=ultrices&a=erat&ipsum=tortor&integer=sollicitudin&a=mi&nibh=sit&in=amet&quis=lobortis&justo=sapien&maecenas=sapien&rhoncus=non&aliquam=mi&lacus=integer&morbi=ac&quis=neque&tortor=duis&id=bibendum&nulla=morbi&ultrices=non&aliquet=quam&maecenas=nec&leo=dui&odio=luctus&condimentum=rutrum&id=nulla&luctus=tellus"
            }
        ],
        "available_markets": "BR"
    }, {
        "album_type": "Mrs",
        "artists": [
            {
                "external_urls": {
                    "spotify": "http://smugmug.com/at/diam/nam.png?non=consequat&velit=in&nec=consequat&nisi=ut&vulputate=nulla&nonummy=sed&maecenas=accumsan&tincidunt=felis&lacus=ut&at=at&velit=dolor&vivamus=quis&vel=odio&nulla=consequat&eget=varius&eros=integer&elementum=ac&pellentesque=leo&quisque=pellentesque&porta=ultrices&volutpat=mattis&erat=odio&quisque=donec"
                },
                "href": "http://chron.com/lobortis.json?convallis=montes&tortor=nascetur&risus=ridiculus&dapibus=mus&augue=etiam&vel=vel&accumsan=augue&tellus=vestibulum&nisi=rutrum&eu=rutrum",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Stévina",
                "type": "artist",
                "uri": "https://wunderground.com/sollicitudin/mi/sit/amet/lobortis/sapien/sapien.aspx?erat=aenean&vestibulum=auctor&sed=gravida&magna=sem&at=praesent&nunc=id&commodo=massa&placerat=id&praesent=nisl&blandit=venenatis&nam=lacinia&nulla=aenean&integer=sit&pede=amet&justo=justo&lacinia=morbi&eget=ut&tincidunt=odio"
            }
        ],
        "available_markets": "BY"
    }, {
        "album_type": "Mr",
        "artists": [
            {
                "external_urls": {
                    "spotify": "http://bravesites.com/vitae/nisi/nam/ultrices/libero/non/mattis.jpg?dictumst=iaculis&etiam=diam&faucibus=erat&cursus=fermentum&urna=justo&ut=nec&tellus=condimentum&nulla=neque&ut=sapien&erat=placerat&id=ante&mauris=nulla&vulputate=justo&elementum=aliquam&nullam=quis&varius=turpis&nulla=eget&facilisi=elit&cras=sodales&non=scelerisque&velit=mauris&nec=sit&nisi=amet&vulputate=eros&nonummy=suspendisse&maecenas=accumsan&tincidunt=tortor&lacus=quis&at=turpis&velit=sed&vivamus=ante&vel=vivamus&nulla=tortor&eget=duis&eros=mattis&elementum=egestas&pellentesque=metus&quisque=aenean&porta=fermentum&volutpat=donec&erat=ut&quisque=mauris&erat=eget&eros=massa&viverra=tempor&eget=convallis&congue=nulla&eget=neque&semper=libero&rutrum=convallis&nulla=eget&nunc=eleifend&purus=luctus&phasellus=ultricies&in=eu&felis=nibh&donec=quisque&semper=id&sapien=justo&a=sit&libero=amet&nam=sapien"
                },
                "href": "https://themeforest.net/at/turpis/donec.aspx?id=ut&luctus=odio&nec=cras&molestie=mi&sed=pede&justo=malesuada&pellentesque=in&viverra=imperdiet&pede=et&ac=commodo&diam=vulputate&cras=justo&pellentesque=in&volutpat=blandit&dui=ultrices&maecenas=enim&tristique=lorem&est=ipsum&et=dolor&tempus=sit&semper=amet&est=consectetuer&quam=adipiscing&pharetra=elit&magna=proin&ac=interdum&consequat=mauris&metus=non&sapien=ligula&ut=pellentesque&nunc=ultrices&vestibulum=phasellus&ante=id&ipsum=sapien&primis=in&in=sapien&faucibus=iaculis&orci=congue&luctus=vivamus&et=metus&ultrices=arcu&posuere=adipiscing&cubilia=molestie&curae=hendrerit&mauris=at&viverra=vulputate&diam=vitae&vitae=nisl&quam=aenean&suspendisse=lectus&potenti=pellentesque&nullam=eget&porttitor=nunc&lacus=donec&at=quis&turpis=orci&donec=eget&posuere=orci&metus=vehicula&vitae=condimentum&ipsum=curabitur&aliquam=in&non=libero&mauris=ut&morbi=massa&non=volutpat&lectus=convallis&aliquam=morbi&sit=odio&amet=odio&diam=elementum&in=eu&magna=interdum&bibendum=eu&imperdiet=tincidunt&nullam=in&orci=leo&pede=maecenas&venenatis=pulvinar&non=lobortis&sodales=est&sed=phasellus&tincidunt=sit&eu=amet&felis=erat&fusce=nulla&posuere=tempus&felis=vivamus&sed=in&lacus=felis",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Marie-françoise",
                "type": "artist",
                "uri": "http://newyorker.com/sed/lacus.html?rutrum=elementum&neque=nullam&aenean=varius&auctor=nulla&gravida=facilisi&sem=cras&praesent=non&id=velit&massa=nec&id=nisi&nisl=vulputate&venenatis=nonummy&lacinia=maecenas&aenean=tincidunt&sit=lacus&amet=at&justo=velit&morbi=vivamus&ut=vel&odio=nulla&cras=eget&mi=eros&pede=elementum&malesuada=pellentesque&in=quisque&imperdiet=porta&et=volutpat&commodo=erat&vulputate=quisque&justo=erat&in=eros&blandit=viverra&ultrices=eget&enim=congue&lorem=eget&ipsum=semper&dolor=rutrum&sit=nulla&amet=nunc&consectetuer=purus&adipiscing=phasellus&elit=in&proin=felis&interdum=donec&mauris=semper&non=sapien&ligula=a&pellentesque=libero&ultrices=nam&phasellus=dui&id=proin&sapien=leo&in=odio&sapien=porttitor&iaculis=id&congue=consequat&vivamus=in&metus=consequat"
            }
        ],
        "available_markets": "MC"
    }, {
        "album_type": "Honorable",
        "artists": [
            {
                "external_urls": {
                    "spotify": "https://tiny.cc/venenatis.js?velit=cursus&donec=vestibulum&diam=proin&neque=eu&vestibulum=mi&eget=nulla&vulputate=ac&ut=enim&ultrices=in&vel=tempor&augue=turpis&vestibulum=nec&ante=euismod"
                },
                "href": "http://godaddy.com/arcu/adipiscing/molestie/hendrerit.html?non=eget&lectus=eleifend&aliquam=luctus&sit=ultricies&amet=eu&diam=nibh&in=quisque&magna=id&bibendum=justo&imperdiet=sit&nullam=amet&orci=sapien&pede=dignissim&venenatis=vestibulum&non=vestibulum&sodales=ante&sed=ipsum&tincidunt=primis&eu=in&felis=faucibus&fusce=orci&posuere=luctus&felis=et&sed=ultrices&lacus=posuere&morbi=cubilia&sem=curae&mauris=nulla&laoreet=dapibus&ut=dolor&rhoncus=vel&aliquet=est&pulvinar=donec&sed=odio&nisl=justo&nunc=sollicitudin&rhoncus=ut&dui=suscipit&vel=a&sem=feugiat&sed=et&sagittis=eros&nam=vestibulum&congue=ac&risus=est&semper=lacinia&porta=nisi&volutpat=venenatis&quam=tristique&pede=fusce&lobortis=congue&ligula=diam&sit=id&amet=ornare&eleifend=imperdiet&pede=sapien&libero=urna&quis=pretium&orci=nisl&nullam=ut&molestie=volutpat&nibh=sapien&in=arcu&lectus=sed&pellentesque=augue&at=aliquam&nulla=erat&suspendisse=volutpat&potenti=in&cras=congue&in=etiam&purus=justo&eu=etiam&magna=pretium&vulputate=iaculis&luctus=justo&cum=in&sociis=hac&natoque=habitasse&penatibus=platea",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Nadège",
                "type": "artist",
                "uri": "http://simplemachines.org/condimentum/id/luctus/nec/molestie/sed.json?nulla=rutrum&suspendisse=neque&potenti=aenean&cras=auctor&in=gravida&purus=sem&eu=praesent&magna=id&vulputate=massa&luctus=id&cum=nisl&sociis=venenatis&natoque=lacinia&penatibus=aenean&et=sit&magnis=amet&dis=justo&parturient=morbi&montes=ut&nascetur=odio&ridiculus=cras&mus=mi&vivamus=pede&vestibulum=malesuada&sagittis=in&sapien=imperdiet&cum=et&sociis=commodo&natoque=vulputate&penatibus=justo&et=in&magnis=blandit&dis=ultrices&parturient=enim&montes=lorem&nascetur=ipsum&ridiculus=dolor&mus=sit&etiam=amet&vel=consectetuer"
            }
        ],
        "available_markets": "AE"
    }, {
        "album_type": "Mr",
        "artists": [
            {
                "external_urls": {
                    "spotify": "https://house.gov/in/quam.aspx?tincidunt=ante&ante=ipsum&vel=primis&ipsum=in&praesent=faucibus&blandit=orci&lacinia=luctus&erat=et&vestibulum=ultrices&sed=posuere&magna=cubilia&at=curae&nunc=nulla&commodo=dapibus&placerat=dolor&praesent=vel&blandit=est&nam=donec&nulla=odio&integer=justo&pede=sollicitudin&justo=ut&lacinia=suscipit&eget=a&tincidunt=feugiat&eget=et&tempus=eros&vel=vestibulum&pede=ac&morbi=est&porttitor=lacinia&lorem=nisi&id=venenatis&ligula=tristique&suspendisse=fusce&ornare=congue&consequat=diam&lectus=id&in=ornare&est=imperdiet&risus=sapien&auctor=urna&sed=pretium&tristique=nisl&in=ut&tempus=volutpat&sit=sapien&amet=arcu&sem=sed&fusce=augue&consequat=aliquam&nulla=erat&nisl=volutpat&nunc=in&nisl=congue&duis=etiam&bibendum=justo&felis=etiam&sed=pretium&interdum=iaculis&venenatis=justo&turpis=in&enim=hac&blandit=habitasse&mi=platea&in=dictumst&porttitor=etiam&pede=faucibus&justo=cursus&eu=urna&massa=ut&donec=tellus"
                },
                "href": "http://wp.com/non/interdum.js?luctus=pede&ultricies=justo&eu=eu&nibh=massa&quisque=donec&id=dapibus&justo=duis&sit=at&amet=velit&sapien=eu&dignissim=est&vestibulum=congue&vestibulum=elementum&ante=in&ipsum=hac&primis=habitasse&in=platea&faucibus=dictumst&orci=morbi&luctus=vestibulum&et=velit&ultrices=id&posuere=pretium&cubilia=iaculis&curae=diam&nulla=erat&dapibus=fermentum&dolor=justo&vel=nec&est=condimentum&donec=neque&odio=sapien&justo=placerat&sollicitudin=ante&ut=nulla&suscipit=justo&a=aliquam&feugiat=quis&et=turpis&eros=eget&vestibulum=elit&ac=sodales&est=scelerisque&lacinia=mauris&nisi=sit&venenatis=amet&tristique=eros&fusce=suspendisse&congue=accumsan&diam=tortor&id=quis&ornare=turpis&imperdiet=sed&sapien=ante&urna=vivamus&pretium=tortor&nisl=duis&ut=mattis&volutpat=egestas&sapien=metus&arcu=aenean&sed=fermentum&augue=donec&aliquam=ut&erat=mauris&volutpat=eget&in=massa&congue=tempor&etiam=convallis&justo=nulla&etiam=neque&pretium=libero&iaculis=convallis&justo=eget&in=eleifend&hac=luctus&habitasse=ultricies&platea=eu&dictumst=nibh&etiam=quisque&faucibus=id&cursus=justo&urna=sit&ut=amet&tellus=sapien&nulla=dignissim&ut=vestibulum&erat=vestibulum&id=ante&mauris=ipsum&vulputate=primis&elementum=in&nullam=faucibus",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Wá",
                "type": "artist",
                "uri": "https://nba.com/condimentum/id/luctus/nec/molestie/sed.js?id=consequat&sapien=metus&in=sapien&sapien=ut&iaculis=nunc&congue=vestibulum&vivamus=ante&metus=ipsum&arcu=primis&adipiscing=in&molestie=faucibus&hendrerit=orci&at=luctus&vulputate=et&vitae=ultrices&nisl=posuere&aenean=cubilia&lectus=curae&pellentesque=mauris&eget=viverra&nunc=diam&donec=vitae&quis=quam&orci=suspendisse&eget=potenti&orci=nullam&vehicula=porttitor&condimentum=lacus&curabitur=at&in=turpis&libero=donec&ut=posuere&massa=metus&volutpat=vitae&convallis=ipsum&morbi=aliquam"
            }
        ],
        "available_markets": "AU"
    }, {
        "album_type": "Dr",
        "artists": [
            {
                "external_urls": {
                    "spotify": "http://cnbc.com/ut/at.png?vestibulum=duis&sit=ac&amet=nibh&cursus=fusce&id=lacus&turpis=purus&integer=aliquet&aliquet=at&massa=feugiat&id=non&lobortis=pretium&convallis=quis&tortor=lectus&risus=suspendisse&dapibus=potenti&augue=in&vel=eleifend&accumsan=quam&tellus=a&nisi=odio&eu=in&orci=hac&mauris=habitasse&lacinia=platea&sapien=dictumst&quis=maecenas&libero=ut&nullam=massa&sit=quis&amet=augue&turpis=luctus&elementum=tincidunt&ligula=nulla&vehicula=mollis&consequat=molestie&morbi=lorem&a=quisque&ipsum=ut&integer=erat&a=curabitur&nibh=gravida&in=nisi&quis=at&justo=nibh&maecenas=in&rhoncus=hac&aliquam=habitasse&lacus=platea&morbi=dictumst&quis=aliquam&tortor=augue&id=quam&nulla=sollicitudin&ultrices=vitae&aliquet=consectetuer&maecenas=eget&leo=rutrum&odio=at&condimentum=lorem&id=integer&luctus=tincidunt&nec=ante&molestie=vel&sed=ipsum&justo=praesent&pellentesque=blandit&viverra=lacinia&pede=erat&ac=vestibulum&diam=sed&cras=magna&pellentesque=at&volutpat=nunc&dui=commodo"
                },
                "href": "https://photobucket.com/integer.html?eget=in&elit=quam&sodales=fringilla&scelerisque=rhoncus&mauris=mauris&sit=enim&amet=leo&eros=rhoncus&suspendisse=sed&accumsan=vestibulum&tortor=sit&quis=amet&turpis=cursus&sed=id&ante=turpis&vivamus=integer&tortor=aliquet&duis=massa&mattis=id&egestas=lobortis&metus=convallis&aenean=tortor&fermentum=risus&donec=dapibus&ut=augue&mauris=vel&eget=accumsan&massa=tellus&tempor=nisi&convallis=eu&nulla=orci&neque=mauris&libero=lacinia&convallis=sapien&eget=quis&eleifend=libero&luctus=nullam&ultricies=sit&eu=amet&nibh=turpis&quisque=elementum&id=ligula&justo=vehicula&sit=consequat&amet=morbi&sapien=a&dignissim=ipsum&vestibulum=integer&vestibulum=a&ante=nibh&ipsum=in&primis=quis&in=justo&faucibus=maecenas&orci=rhoncus&luctus=aliquam&et=lacus&ultrices=morbi&posuere=quis&cubilia=tortor&curae=id&nulla=nulla&dapibus=ultrices&dolor=aliquet&vel=maecenas&est=leo&donec=odio&odio=condimentum&justo=id&sollicitudin=luctus&ut=nec&suscipit=molestie&a=sed&feugiat=justo&et=pellentesque&eros=viverra&vestibulum=pede&ac=ac&est=diam&lacinia=cras&nisi=pellentesque&venenatis=volutpat&tristique=dui&fusce=maecenas&congue=tristique&diam=est&id=et",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Eliès",
                "type": "artist",
                "uri": "https://independent.co.uk/non/pretium.aspx?in=congue&lectus=etiam&pellentesque=justo&at=etiam&nulla=pretium&suspendisse=iaculis&potenti=justo"
            }
        ],
        "available_markets": "EG"
    }, {
        "album_type": "Mr",
        "artists": [
            {
                "external_urls": {
                    "spotify": "https://sina.com.cn/proin/risus.png?accumsan=ultrices&odio=libero&curabitur=non&convallis=mattis&duis=pulvinar&consequat=nulla"
                },
                "href": "http://google.com.au/nam/ultrices/libero/non.json?bibendum=in&imperdiet=hac&nullam=habitasse&orci=platea&pede=dictumst&venenatis=aliquam&non=augue&sodales=quam&sed=sollicitudin&tincidunt=vitae&eu=consectetuer&felis=eget&fusce=rutrum&posuere=at&felis=lorem&sed=integer&lacus=tincidunt&morbi=ante&sem=vel",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Yóu",
                "type": "artist",
                "uri": "http://canalblog.com/cras/in/purus.jpg?odio=pretium&curabitur=iaculis&convallis=justo&duis=in&consequat=hac&dui=habitasse&nec=platea&nisi=dictumst&volutpat=etiam&eleifend=faucibus&donec=cursus&ut=urna&dolor=ut&morbi=tellus&vel=nulla&lectus=ut&in=erat&quam=id&fringilla=mauris&rhoncus=vulputate&mauris=elementum&enim=nullam&leo=varius&rhoncus=nulla&sed=facilisi&vestibulum=cras&sit=non&amet=velit&cursus=nec&id=nisi&turpis=vulputate&integer=nonummy&aliquet=maecenas&massa=tincidunt&id=lacus&lobortis=at&convallis=velit&tortor=vivamus&risus=vel&dapibus=nulla&augue=eget&vel=eros&accumsan=elementum&tellus=pellentesque&nisi=quisque&eu=porta&orci=volutpat"
            }
        ],
        "available_markets": "AR"
    }, {
        "album_type": "Mrs",
        "artists": [
            {
                "external_urls": {
                    "spotify": "http://smh.com.au/blandit/nam.png?in=fusce&libero=consequat&ut=nulla&massa=nisl&volutpat=nunc&convallis=nisl&morbi=duis&odio=bibendum&odio=felis&elementum=sed&eu=interdum&interdum=venenatis&eu=turpis&tincidunt=enim&in=blandit&leo=mi&maecenas=in&pulvinar=porttitor&lobortis=pede&est=justo"
                },
                "href": "http://wired.com/ligula/vehicula/consequat/morbi/a.xml?venenatis=ligula&tristique=suspendisse&fusce=ornare&congue=consequat&diam=lectus&id=in&ornare=est&imperdiet=risus&sapien=auctor&urna=sed&pretium=tristique&nisl=in&ut=tempus&volutpat=sit&sapien=amet&arcu=sem&sed=fusce&augue=consequat&aliquam=nulla&erat=nisl&volutpat=nunc&in=nisl&congue=duis&etiam=bibendum&justo=felis&etiam=sed&pretium=interdum&iaculis=venenatis&justo=turpis&in=enim&hac=blandit&habitasse=mi&platea=in&dictumst=porttitor&etiam=pede&faucibus=justo&cursus=eu&urna=massa&ut=donec&tellus=dapibus&nulla=duis&ut=at&erat=velit&id=eu&mauris=est&vulputate=congue&elementum=elementum&nullam=in&varius=hac&nulla=habitasse&facilisi=platea&cras=dictumst",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Anaïs",
                "type": "artist",
                "uri": "http://biblegateway.com/vel/nulla/eget/eros/elementum/pellentesque/quisque.js?diam=sem&cras=fusce&pellentesque=consequat&volutpat=nulla&dui=nisl&maecenas=nunc&tristique=nisl&est=duis&et=bibendum&tempus=felis&semper=sed&est=interdum&quam=venenatis&pharetra=turpis&magna=enim&ac=blandit&consequat=mi&metus=in&sapien=porttitor&ut=pede&nunc=justo&vestibulum=eu&ante=massa&ipsum=donec&primis=dapibus&in=duis&faucibus=at&orci=velit&luctus=eu&et=est&ultrices=congue&posuere=elementum&cubilia=in&curae=hac&mauris=habitasse&viverra=platea"
            }
        ],
        "available_markets": "US"
    }, {
        "album_type": "Ms",
        "artists": [
            {
                "external_urls": {
                    "spotify": "https://storify.com/morbi/non/lectus/aliquam/sit.jsp?molestie=pellentesque&lorem=ultrices&quisque=mattis&ut=odio&erat=donec&curabitur=vitae&gravida=nisi&nisi=nam&at=ultrices&nibh=libero&in=non&hac=mattis&habitasse=pulvinar&platea=nulla&dictumst=pede&aliquam=ullamcorper&augue=augue&quam=a&sollicitudin=suscipit&vitae=nulla&consectetuer=elit&eget=ac&rutrum=nulla&at=sed&lorem=vel"
                },
                "href": "https://simplemachines.org/dolor/sit/amet/consectetuer.png?eget=pulvinar&eleifend=nulla&luctus=pede",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Agnès",
                "type": "artist",
                "uri": "http://xinhuanet.com/proin/risus/praesent/lectus/vestibulum/quam/sapien.xml?eu=consequat&massa=in&donec=consequat&dapibus=ut&duis=nulla&at=sed&velit=accumsan&eu=felis&est=ut&congue=at&elementum=dolor&in=quis&hac=odio&habitasse=consequat&platea=varius&dictumst=integer&morbi=ac&vestibulum=leo"
            }
        ],
        "available_markets": "JP"
    }, {
        "album_type": "Mrs",
        "artists": [
            {
                "external_urls": {
                    "spotify": "https://liveinternet.ru/vestibulum/ante.jpg?vel=porttitor&sem=id&sed=consequat&sagittis=in&nam=consequat&congue=ut&risus=nulla&semper=sed&porta=accumsan&volutpat=felis&quam=ut&pede=at&lobortis=dolor&ligula=quis&sit=odio&amet=consequat&eleifend=varius&pede=integer&libero=ac&quis=leo&orci=pellentesque&nullam=ultrices&molestie=mattis&nibh=odio&in=donec&lectus=vitae&pellentesque=nisi&at=nam&nulla=ultrices&suspendisse=libero&potenti=non&cras=mattis&in=pulvinar&purus=nulla&eu=pede&magna=ullamcorper&vulputate=augue&luctus=a&cum=suscipit&sociis=nulla&natoque=elit&penatibus=ac&et=nulla&magnis=sed&dis=vel&parturient=enim&montes=sit&nascetur=amet&ridiculus=nunc&mus=viverra&vivamus=dapibus&vestibulum=nulla&sagittis=suscipit&sapien=ligula&cum=in&sociis=lacus&natoque=curabitur&penatibus=at&et=ipsum&magnis=ac"
                },
                "href": "https://seesaa.net/habitasse.jpg?id=lacus&lobortis=purus&convallis=aliquet&tortor=at&risus=feugiat&dapibus=non&augue=pretium&vel=quis&accumsan=lectus&tellus=suspendisse&nisi=potenti&eu=in&orci=eleifend&mauris=quam&lacinia=a&sapien=odio&quis=in&libero=hac&nullam=habitasse&sit=platea&amet=dictumst&turpis=maecenas&elementum=ut&ligula=massa&vehicula=quis&consequat=augue&morbi=luctus&a=tincidunt&ipsum=nulla&integer=mollis&a=molestie&nibh=lorem&in=quisque&quis=ut&justo=erat&maecenas=curabitur&rhoncus=gravida&aliquam=nisi&lacus=at&morbi=nibh&quis=in&tortor=hac&id=habitasse&nulla=platea&ultrices=dictumst&aliquet=aliquam&maecenas=augue&leo=quam&odio=sollicitudin&condimentum=vitae&id=consectetuer&luctus=eget&nec=rutrum&molestie=at&sed=lorem&justo=integer&pellentesque=tincidunt&viverra=ante&pede=vel&ac=ipsum&diam=praesent&cras=blandit&pellentesque=lacinia&volutpat=erat&dui=vestibulum&maecenas=sed",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Marie-françoise",
                "type": "artist",
                "uri": "https://uol.com.br/elit/proin/risus/praesent.jpg?tortor=faucibus&id=accumsan&nulla=odio&ultrices=curabitur&aliquet=convallis&maecenas=duis&leo=consequat&odio=dui&condimentum=nec&id=nisi&luctus=volutpat&nec=eleifend&molestie=donec&sed=ut&justo=dolor&pellentesque=morbi&viverra=vel&pede=lectus&ac=in&diam=quam&cras=fringilla&pellentesque=rhoncus&volutpat=mauris&dui=enim&maecenas=leo&tristique=rhoncus&est=sed&et=vestibulum&tempus=sit&semper=amet&est=cursus&quam=id&pharetra=turpis&magna=integer&ac=aliquet&consequat=massa&metus=id&sapien=lobortis&ut=convallis&nunc=tortor&vestibulum=risus&ante=dapibus&ipsum=augue&primis=vel&in=accumsan&faucibus=tellus&orci=nisi&luctus=eu&et=orci&ultrices=mauris&posuere=lacinia&cubilia=sapien&curae=quis&mauris=libero&viverra=nullam&diam=sit&vitae=amet&quam=turpis&suspendisse=elementum&potenti=ligula&nullam=vehicula&porttitor=consequat&lacus=morbi&at=a&turpis=ipsum&donec=integer&posuere=a&metus=nibh&vitae=in&ipsum=quis&aliquam=justo&non=maecenas&mauris=rhoncus&morbi=aliquam&non=lacus&lectus=morbi&aliquam=quis&sit=tortor&amet=id&diam=nulla&in=ultrices&magna=aliquet&bibendum=maecenas"
            }
        ],
        "available_markets": "AE"
    }, {
        "album_type": "Rev",
        "artists": [
            {
                "external_urls": {
                    "spotify": "https://berkeley.edu/luctus/et/ultrices/posuere/cubilia/curae/duis.aspx?lacus=in&purus=quam&aliquet=fringilla&at=rhoncus&feugiat=mauris&non=enim&pretium=leo&quis=rhoncus&lectus=sed&suspendisse=vestibulum&potenti=sit&in=amet&eleifend=cursus&quam=id&a=turpis&odio=integer&in=aliquet&hac=massa&habitasse=id&platea=lobortis&dictumst=convallis&maecenas=tortor&ut=risus&massa=dapibus&quis=augue&augue=vel&luctus=accumsan&tincidunt=tellus&nulla=nisi&mollis=eu&molestie=orci&lorem=mauris&quisque=lacinia&ut=sapien&erat=quis&curabitur=libero&gravida=nullam&nisi=sit&at=amet&nibh=turpis&in=elementum&hac=ligula&habitasse=vehicula&platea=consequat&dictumst=morbi&aliquam=a&augue=ipsum&quam=integer&sollicitudin=a&vitae=nibh&consectetuer=in&eget=quis&rutrum=justo&at=maecenas&lorem=rhoncus&integer=aliquam&tincidunt=lacus&ante=morbi&vel=quis&ipsum=tortor&praesent=id&blandit=nulla&lacinia=ultrices&erat=aliquet&vestibulum=maecenas&sed=leo&magna=odio&at=condimentum&nunc=id&commodo=luctus&placerat=nec&praesent=molestie&blandit=sed&nam=justo&nulla=pellentesque&integer=viverra&pede=pede&justo=ac&lacinia=diam&eget=cras&tincidunt=pellentesque&eget=volutpat&tempus=dui&vel=maecenas&pede=tristique&morbi=est&porttitor=et&lorem=tempus&id=semper&ligula=est&suspendisse=quam&ornare=pharetra&consequat=magna&lectus=ac"
                },
                "href": "http://oracle.com/at/velit/vivamus/vel/nulla/eget/eros.jpg?diam=lectus&neque=in&vestibulum=est&eget=risus&vulputate=auctor&ut=sed&ultrices=tristique&vel=in&augue=tempus&vestibulum=sit&ante=amet&ipsum=sem&primis=fusce&in=consequat&faucibus=nulla&orci=nisl&luctus=nunc",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Táng",
                "type": "artist",
                "uri": "https://fotki.com/in/quam/fringilla/rhoncus/mauris/enim/leo.jpg?massa=odio&donec=cras&dapibus=mi&duis=pede&at=malesuada&velit=in&eu=imperdiet&est=et&congue=commodo&elementum=vulputate&in=justo&hac=in&habitasse=blandit&platea=ultrices&dictumst=enim&morbi=lorem&vestibulum=ipsum&velit=dolor&id=sit&pretium=amet&iaculis=consectetuer&diam=adipiscing&erat=elit&fermentum=proin&justo=interdum&nec=mauris&condimentum=non&neque=ligula&sapien=pellentesque&placerat=ultrices&ante=phasellus&nulla=id&justo=sapien&aliquam=in&quis=sapien&turpis=iaculis&eget=congue&elit=vivamus&sodales=metus&scelerisque=arcu&mauris=adipiscing&sit=molestie&amet=hendrerit&eros=at&suspendisse=vulputate&accumsan=vitae&tortor=nisl&quis=aenean&turpis=lectus&sed=pellentesque&ante=eget&vivamus=nunc&tortor=donec&duis=quis&mattis=orci&egestas=eget&metus=orci&aenean=vehicula&fermentum=condimentum&donec=curabitur&ut=in&mauris=libero&eget=ut&massa=massa&tempor=volutpat&convallis=convallis&nulla=morbi&neque=odio&libero=odio&convallis=elementum&eget=eu&eleifend=interdum&luctus=eu&ultricies=tincidunt"
            }
        ],
        "available_markets": "ZA"
    }, {
        "album_type": "Ms",
        "artists": [
            {
                "external_urls": {
                    "spotify": "http://economist.com/ut/erat/id/mauris.html?ultrices=vestibulum&mattis=quam&odio=sapien&donec=varius&vitae=ut&nisi=blandit&nam=non&ultrices=interdum&libero=in&non=ante&mattis=vestibulum&pulvinar=ante&nulla=ipsum&pede=primis&ullamcorper=in&augue=faucibus&a=orci&suscipit=luctus&nulla=et&elit=ultrices&ac=posuere&nulla=cubilia&sed=curae&vel=duis&enim=faucibus&sit=accumsan&amet=odio&nunc=curabitur&viverra=convallis&dapibus=duis&nulla=consequat&suscipit=dui&ligula=nec&in=nisi&lacus=volutpat&curabitur=eleifend&at=donec&ipsum=ut&ac=dolor&tellus=morbi&semper=vel&interdum=lectus&mauris=in&ullamcorper=quam&purus=fringilla&sit=rhoncus&amet=mauris&nulla=enim&quisque=leo&arcu=rhoncus&libero=sed&rutrum=vestibulum&ac=sit&lobortis=amet"
                },
                "href": "https://cornell.edu/eget/vulputate/ut/ultrices/vel.json?dictumst=ante&aliquam=ipsum&augue=primis&quam=in&sollicitudin=faucibus&vitae=orci&consectetuer=luctus&eget=et&rutrum=ultrices&at=posuere&lorem=cubilia&integer=curae&tincidunt=donec&ante=pharetra&vel=magna&ipsum=vestibulum&praesent=aliquet&blandit=ultrices&lacinia=erat&erat=tortor&vestibulum=sollicitudin&sed=mi&magna=sit&at=amet&nunc=lobortis&commodo=sapien&placerat=sapien",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Cinéma",
                "type": "artist",
                "uri": "http://narod.ru/augue.aspx?porta=amet&volutpat=sapien&erat=dignissim&quisque=vestibulum&erat=vestibulum&eros=ante&viverra=ipsum&eget=primis&congue=in&eget=faucibus&semper=orci&rutrum=luctus&nulla=et&nunc=ultrices&purus=posuere&phasellus=cubilia&in=curae&felis=nulla&donec=dapibus&semper=dolor&sapien=vel&a=est&libero=donec&nam=odio&dui=justo&proin=sollicitudin&leo=ut&odio=suscipit&porttitor=a&id=feugiat"
            }
        ],
        "available_markets": "CR"
    }, {
        "album_type": "Dr",
        "artists": [
            {
                "external_urls": {
                    "spotify": "http://naver.com/ut/dolor/morbi/vel/lectus/in.js?vestibulum=tempus&sed=vel&magna=pede&at=morbi&nunc=porttitor&commodo=lorem&placerat=id&praesent=ligula&blandit=suspendisse&nam=ornare&nulla=consequat&integer=lectus&pede=in&justo=est&lacinia=risus"
                },
                "href": "http://quantcast.com/dapibus/augue/vel/accumsan.js?a=pede&nibh=justo&in=lacinia&quis=eget&justo=tincidunt&maecenas=eget&rhoncus=tempus&aliquam=vel&lacus=pede&morbi=morbi&quis=porttitor&tortor=lorem&id=id&nulla=ligula&ultrices=suspendisse&aliquet=ornare&maecenas=consequat&leo=lectus&odio=in&condimentum=est&id=risus&luctus=auctor&nec=sed&molestie=tristique&sed=in&justo=tempus&pellentesque=sit&viverra=amet&pede=sem&ac=fusce&diam=consequat&cras=nulla&pellentesque=nisl&volutpat=nunc&dui=nisl&maecenas=duis&tristique=bibendum&est=felis&et=sed&tempus=interdum&semper=venenatis&est=turpis&quam=enim&pharetra=blandit&magna=mi&ac=in&consequat=porttitor&metus=pede&sapien=justo&ut=eu&nunc=massa&vestibulum=donec&ante=dapibus&ipsum=duis&primis=at&in=velit&faucibus=eu&orci=est&luctus=congue&et=elementum&ultrices=in&posuere=hac&cubilia=habitasse&curae=platea&mauris=dictumst&viverra=morbi&diam=vestibulum&vitae=velit&quam=id&suspendisse=pretium&potenti=iaculis&nullam=diam&porttitor=erat&lacus=fermentum&at=justo&turpis=nec&donec=condimentum&posuere=neque&metus=sapien&vitae=placerat&ipsum=ante&aliquam=nulla&non=justo&mauris=aliquam&morbi=quis&non=turpis&lectus=eget&aliquam=elit&sit=sodales",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Adèle",
                "type": "artist",
                "uri": "http://ycombinator.com/habitasse/platea/dictumst/etiam/faucibus.jpg?et=nibh&magnis=in&dis=quis&parturient=justo&montes=maecenas&nascetur=rhoncus&ridiculus=aliquam&mus=lacus&etiam=morbi&vel=quis&augue=tortor&vestibulum=id&rutrum=nulla&rutrum=ultrices&neque=aliquet&aenean=maecenas&auctor=leo&gravida=odio&sem=condimentum&praesent=id&id=luctus&massa=nec&id=molestie&nisl=sed&venenatis=justo&lacinia=pellentesque&aenean=viverra"
            }
        ],
        "available_markets": "EG"
    }, {
        "album_type": "Mr",
        "artists": [
            {
                "external_urls": {
                    "spotify": "https://bloomberg.com/eu/interdum/eu/tincidunt/in/leo.js?libero=sagittis&nam=dui&dui=vel&proin=nisl&leo=duis&odio=ac&porttitor=nibh&id=fusce&consequat=lacus&in=purus&consequat=aliquet&ut=at&nulla=feugiat&sed=non&accumsan=pretium&felis=quis&ut=lectus&at=suspendisse&dolor=potenti&quis=in&odio=eleifend&consequat=quam&varius=a&integer=odio&ac=in&leo=hac&pellentesque=habitasse&ultrices=platea&mattis=dictumst&odio=maecenas&donec=ut&vitae=massa&nisi=quis&nam=augue&ultrices=luctus&libero=tincidunt&non=nulla&mattis=mollis&pulvinar=molestie&nulla=lorem&pede=quisque"
                },
                "href": "https://yandex.ru/semper/porta/volutpat.png?ut=odio&ultrices=elementum&vel=eu&augue=interdum&vestibulum=eu&ante=tincidunt&ipsum=in&primis=leo&in=maecenas&faucibus=pulvinar&orci=lobortis&luctus=est&et=phasellus&ultrices=sit&posuere=amet&cubilia=erat&curae=nulla&donec=tempus&pharetra=vivamus&magna=in&vestibulum=felis&aliquet=eu&ultrices=sapien&erat=cursus&tortor=vestibulum&sollicitudin=proin&mi=eu&sit=mi&amet=nulla&lobortis=ac&sapien=enim&sapien=in&non=tempor&mi=turpis&integer=nec&ac=euismod&neque=scelerisque&duis=quam&bibendum=turpis&morbi=adipiscing&non=lorem&quam=vitae&nec=mattis&dui=nibh&luctus=ligula&rutrum=nec&nulla=sem",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Léa",
                "type": "artist",
                "uri": "https://unc.edu/donec.xml?egestas=facilisi&metus=cras&aenean=non&fermentum=velit&donec=nec&ut=nisi&mauris=vulputate&eget=nonummy&massa=maecenas&tempor=tincidunt&convallis=lacus&nulla=at&neque=velit&libero=vivamus&convallis=vel&eget=nulla&eleifend=eget&luctus=eros&ultricies=elementum&eu=pellentesque&nibh=quisque&quisque=porta&id=volutpat&justo=erat&sit=quisque&amet=erat&sapien=eros&dignissim=viverra&vestibulum=eget&vestibulum=congue&ante=eget&ipsum=semper&primis=rutrum&in=nulla&faucibus=nunc&orci=purus&luctus=phasellus&et=in&ultrices=felis&posuere=donec&cubilia=semper&curae=sapien&nulla=a&dapibus=libero&dolor=nam&vel=dui&est=proin&donec=leo&odio=odio&justo=porttitor&sollicitudin=id&ut=consequat&suscipit=in&a=consequat&feugiat=ut&et=nulla&eros=sed&vestibulum=accumsan&ac=felis&est=ut&lacinia=at&nisi=dolor&venenatis=quis&tristique=odio&fusce=consequat&congue=varius&diam=integer&id=ac&ornare=leo&imperdiet=pellentesque&sapien=ultrices&urna=mattis&pretium=odio"
            }
        ],
        "available_markets": "KW"
    }, {
        "album_type": "Ms",
        "artists": [
            {
                "external_urls": {
                    "spotify": "http://tripod.com/ut.html?odio=aenean&elementum=auctor&eu=gravida&interdum=sem&eu=praesent&tincidunt=id&in=massa&leo=id&maecenas=nisl&pulvinar=venenatis&lobortis=lacinia&est=aenean&phasellus=sit&sit=amet&amet=justo&erat=morbi&nulla=ut&tempus=odio&vivamus=cras&in=mi&felis=pede&eu=malesuada&sapien=in&cursus=imperdiet&vestibulum=et&proin=commodo&eu=vulputate&mi=justo&nulla=in&ac=blandit&enim=ultrices&in=enim&tempor=lorem&turpis=ipsum&nec=dolor&euismod=sit&scelerisque=amet&quam=consectetuer&turpis=adipiscing&adipiscing=elit&lorem=proin&vitae=interdum&mattis=mauris&nibh=non&ligula=ligula&nec=pellentesque&sem=ultrices&duis=phasellus&aliquam=id&convallis=sapien&nunc=in&proin=sapien&at=iaculis&turpis=congue&a=vivamus&pede=metus&posuere=arcu&nonummy=adipiscing&integer=molestie&non=hendrerit&velit=at&donec=vulputate&diam=vitae&neque=nisl&vestibulum=aenean&eget=lectus&vulputate=pellentesque&ut=eget&ultrices=nunc&vel=donec&augue=quis&vestibulum=orci&ante=eget&ipsum=orci&primis=vehicula&in=condimentum&faucibus=curabitur&orci=in&luctus=libero&et=ut&ultrices=massa&posuere=volutpat&cubilia=convallis&curae=morbi&donec=odio&pharetra=odio&magna=elementum&vestibulum=eu&aliquet=interdum"
                },
                "href": "http://blogspot.com/eu.js?rutrum=in&nulla=faucibus&tellus=orci&in=luctus&sagittis=et&dui=ultrices&vel=posuere&nisl=cubilia&duis=curae&ac=duis&nibh=faucibus&fusce=accumsan&lacus=odio&purus=curabitur&aliquet=convallis&at=duis&feugiat=consequat&non=dui&pretium=nec&quis=nisi&lectus=volutpat&suspendisse=eleifend&potenti=donec&in=ut&eleifend=dolor&quam=morbi&a=vel&odio=lectus&in=in&hac=quam&habitasse=fringilla&platea=rhoncus&dictumst=mauris&maecenas=enim&ut=leo&massa=rhoncus&quis=sed&augue=vestibulum&luctus=sit&tincidunt=amet&nulla=cursus&mollis=id&molestie=turpis&lorem=integer&quisque=aliquet&ut=massa&erat=id&curabitur=lobortis&gravida=convallis&nisi=tortor&at=risus&nibh=dapibus&in=augue&hac=vel&habitasse=accumsan&platea=tellus&dictumst=nisi&aliquam=eu&augue=orci&quam=mauris&sollicitudin=lacinia&vitae=sapien&consectetuer=quis&eget=libero&rutrum=nullam&at=sit&lorem=amet&integer=turpis",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Maëlyss",
                "type": "artist",
                "uri": "https://ameblo.jp/sed.html?sapien=venenatis&cum=tristique&sociis=fusce&natoque=congue&penatibus=diam&et=id&magnis=ornare&dis=imperdiet&parturient=sapien&montes=urna&nascetur=pretium&ridiculus=nisl&mus=ut&etiam=volutpat&vel=sapien&augue=arcu&vestibulum=sed&rutrum=augue&rutrum=aliquam&neque=erat&aenean=volutpat&auctor=in&gravida=congue&sem=etiam&praesent=justo&id=etiam&massa=pretium&id=iaculis&nisl=justo&venenatis=in&lacinia=hac&aenean=habitasse&sit=platea&amet=dictumst&justo=etiam&morbi=faucibus&ut=cursus&odio=urna&cras=ut&mi=tellus&pede=nulla&malesuada=ut&in=erat&imperdiet=id&et=mauris&commodo=vulputate&vulputate=elementum&justo=nullam&in=varius&blandit=nulla&ultrices=facilisi&enim=cras&lorem=non&ipsum=velit&dolor=nec&sit=nisi&amet=vulputate&consectetuer=nonummy&adipiscing=maecenas&elit=tincidunt&proin=lacus&interdum=at&mauris=velit&non=vivamus&ligula=vel&pellentesque=nulla&ultrices=eget&phasellus=eros&id=elementum&sapien=pellentesque&in=quisque&sapien=porta&iaculis=volutpat&congue=erat&vivamus=quisque&metus=erat&arcu=eros&adipiscing=viverra&molestie=eget&hendrerit=congue&at=eget&vulputate=semper&vitae=rutrum"
            }
        ],
        "available_markets": "LB"
    }, {
        "album_type": "Rev",
        "artists": [
            {
                "external_urls": {
                    "spotify": "http://aol.com/convallis/nulla/neque.jsp?nisi=nec&nam=dui&ultrices=luctus&libero=rutrum&non=nulla&mattis=tellus&pulvinar=in&nulla=sagittis&pede=dui&ullamcorper=vel&augue=nisl&a=duis&suscipit=ac&nulla=nibh&elit=fusce&ac=lacus&nulla=purus&sed=aliquet&vel=at&enim=feugiat&sit=non&amet=pretium&nunc=quis&viverra=lectus&dapibus=suspendisse&nulla=potenti&suscipit=in&ligula=eleifend&in=quam&lacus=a&curabitur=odio&at=in&ipsum=hac&ac=habitasse&tellus=platea&semper=dictumst&interdum=maecenas&mauris=ut&ullamcorper=massa&purus=quis&sit=augue&amet=luctus&nulla=tincidunt&quisque=nulla&arcu=mollis&libero=molestie&rutrum=lorem"
                },
                "href": "http://ovh.net/sollicitudin/mi/sit/amet.html?vel=aliquam&lectus=quis&in=turpis&quam=eget&fringilla=elit&rhoncus=sodales&mauris=scelerisque&enim=mauris&leo=sit&rhoncus=amet&sed=eros&vestibulum=suspendisse&sit=accumsan&amet=tortor&cursus=quis&id=turpis&turpis=sed&integer=ante&aliquet=vivamus&massa=tortor&id=duis&lobortis=mattis&convallis=egestas&tortor=metus&risus=aenean&dapibus=fermentum&augue=donec&vel=ut&accumsan=mauris&tellus=eget&nisi=massa&eu=tempor&orci=convallis&mauris=nulla&lacinia=neque&sapien=libero&quis=convallis&libero=eget&nullam=eleifend&sit=luctus&amet=ultricies&turpis=eu&elementum=nibh&ligula=quisque&vehicula=id&consequat=justo&morbi=sit&a=amet&ipsum=sapien&integer=dignissim&a=vestibulum&nibh=vestibulum&in=ante&quis=ipsum&justo=primis&maecenas=in&rhoncus=faucibus",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Åslög",
                "type": "artist",
                "uri": "http://stumbleupon.com/in/hac.html?in=metus&leo=aenean&maecenas=fermentum&pulvinar=donec&lobortis=ut&est=mauris&phasellus=eget&sit=massa&amet=tempor&erat=convallis&nulla=nulla&tempus=neque&vivamus=libero&in=convallis&felis=eget&eu=eleifend&sapien=luctus&cursus=ultricies&vestibulum=eu&proin=nibh&eu=quisque&mi=id&nulla=justo&ac=sit&enim=amet&in=sapien&tempor=dignissim&turpis=vestibulum&nec=vestibulum&euismod=ante&scelerisque=ipsum&quam=primis&turpis=in&adipiscing=faucibus&lorem=orci&vitae=luctus&mattis=et&nibh=ultrices&ligula=posuere&nec=cubilia&sem=curae&duis=nulla&aliquam=dapibus&convallis=dolor&nunc=vel&proin=est&at=donec&turpis=odio&a=justo&pede=sollicitudin&posuere=ut&nonummy=suscipit&integer=a&non=feugiat&velit=et&donec=eros&diam=vestibulum&neque=ac&vestibulum=est&eget=lacinia&vulputate=nisi&ut=venenatis&ultrices=tristique&vel=fusce&augue=congue&vestibulum=diam&ante=id&ipsum=ornare&primis=imperdiet&in=sapien&faucibus=urna&orci=pretium&luctus=nisl&et=ut&ultrices=volutpat&posuere=sapien"
            }
        ],
        "available_markets": "BD"
    }, {
        "album_type": "Rev",
        "artists": [
            {
                "external_urls": {
                    "spotify": "https://comcast.net/sit/amet.png?vel=id&sem=ligula&sed=suspendisse&sagittis=ornare&nam=consequat&congue=lectus&risus=in&semper=est&porta=risus&volutpat=auctor&quam=sed&pede=tristique&lobortis=in&ligula=tempus&sit=sit&amet=amet&eleifend=sem&pede=fusce&libero=consequat&quis=nulla&orci=nisl&nullam=nunc&molestie=nisl&nibh=duis&in=bibendum&lectus=felis&pellentesque=sed&at=interdum&nulla=venenatis&suspendisse=turpis&potenti=enim&cras=blandit&in=mi&purus=in&eu=porttitor&magna=pede&vulputate=justo&luctus=eu&cum=massa&sociis=donec&natoque=dapibus&penatibus=duis&et=at&magnis=velit&dis=eu&parturient=est&montes=congue&nascetur=elementum&ridiculus=in&mus=hac&vivamus=habitasse&vestibulum=platea&sagittis=dictumst&sapien=morbi&cum=vestibulum&sociis=velit&natoque=id&penatibus=pretium&et=iaculis&magnis=diam&dis=erat&parturient=fermentum&montes=justo&nascetur=nec&ridiculus=condimentum&mus=neque&etiam=sapien&vel=placerat&augue=ante&vestibulum=nulla&rutrum=justo&rutrum=aliquam&neque=quis&aenean=turpis&auctor=eget&gravida=elit&sem=sodales&praesent=scelerisque&id=mauris&massa=sit&id=amet&nisl=eros&venenatis=suspendisse&lacinia=accumsan&aenean=tortor&sit=quis&amet=turpis&justo=sed&morbi=ante&ut=vivamus"
                },
                "href": "https://geocities.com/enim/in/tempor/turpis/nec.json?fusce=iaculis&posuere=congue&felis=vivamus&sed=metus&lacus=arcu&morbi=adipiscing&sem=molestie&mauris=hendrerit&laoreet=at&ut=vulputate&rhoncus=vitae&aliquet=nisl&pulvinar=aenean&sed=lectus&nisl=pellentesque&nunc=eget&rhoncus=nunc&dui=donec&vel=quis&sem=orci&sed=eget&sagittis=orci&nam=vehicula&congue=condimentum&risus=curabitur&semper=in&porta=libero&volutpat=ut&quam=massa&pede=volutpat&lobortis=convallis&ligula=morbi&sit=odio&amet=odio&eleifend=elementum&pede=eu&libero=interdum&quis=eu&orci=tincidunt&nullam=in&molestie=leo&nibh=maecenas&in=pulvinar&lectus=lobortis&pellentesque=est&at=phasellus&nulla=sit&suspendisse=amet&potenti=erat",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Lucrèce",
                "type": "artist",
                "uri": "http://usatoday.com/mauris.js?luctus=risus&rutrum=auctor&nulla=sed&tellus=tristique&in=in&sagittis=tempus&dui=sit&vel=amet&nisl=sem&duis=fusce&ac=consequat&nibh=nulla&fusce=nisl&lacus=nunc&purus=nisl&aliquet=duis&at=bibendum&feugiat=felis&non=sed&pretium=interdum&quis=venenatis&lectus=turpis&suspendisse=enim&potenti=blandit&in=mi&eleifend=in&quam=porttitor&a=pede&odio=justo&in=eu&hac=massa&habitasse=donec&platea=dapibus&dictumst=duis&maecenas=at&ut=velit&massa=eu"
            }
        ],
        "available_markets": "AU"
    }, {
        "album_type": "Rev",
        "artists": [
            {
                "external_urls": {
                    "spotify": "https://constantcontact.com/sollicitudin/mi/sit/amet/lobortis/sapien.jsp?ut=sociis&dolor=natoque&morbi=penatibus&vel=et&lectus=magnis&in=dis&quam=parturient&fringilla=montes&rhoncus=nascetur&mauris=ridiculus&enim=mus&leo=vivamus&rhoncus=vestibulum&sed=sagittis&vestibulum=sapien&sit=cum&amet=sociis&cursus=natoque&id=penatibus&turpis=et&integer=magnis&aliquet=dis&massa=parturient&id=montes&lobortis=nascetur&convallis=ridiculus&tortor=mus&risus=etiam&dapibus=vel&augue=augue&vel=vestibulum&accumsan=rutrum&tellus=rutrum&nisi=neque&eu=aenean&orci=auctor&mauris=gravida&lacinia=sem&sapien=praesent&quis=id&libero=massa&nullam=id&sit=nisl&amet=venenatis&turpis=lacinia&elementum=aenean&ligula=sit&vehicula=amet&consequat=justo&morbi=morbi"
                },
                "href": "http://cornell.edu/erat/id/mauris/vulputate/elementum/nullam/varius.html?tortor=tristique&duis=est&mattis=et&egestas=tempus&metus=semper&aenean=est&fermentum=quam&donec=pharetra&ut=magna&mauris=ac&eget=consequat&massa=metus&tempor=sapien&convallis=ut&nulla=nunc&neque=vestibulum&libero=ante&convallis=ipsum&eget=primis&eleifend=in&luctus=faucibus&ultricies=orci&eu=luctus&nibh=et&quisque=ultrices&id=posuere&justo=cubilia&sit=curae&amet=mauris&sapien=viverra&dignissim=diam&vestibulum=vitae&vestibulum=quam&ante=suspendisse&ipsum=potenti&primis=nullam&in=porttitor&faucibus=lacus&orci=at&luctus=turpis&et=donec&ultrices=posuere&posuere=metus&cubilia=vitae&curae=ipsum&nulla=aliquam&dapibus=non&dolor=mauris&vel=morbi&est=non&donec=lectus&odio=aliquam&justo=sit&sollicitudin=amet&ut=diam&suscipit=in&a=magna&feugiat=bibendum&et=imperdiet&eros=nullam&vestibulum=orci&ac=pede&est=venenatis&lacinia=non&nisi=sodales&venenatis=sed&tristique=tincidunt&fusce=eu&congue=felis&diam=fusce&id=posuere&ornare=felis&imperdiet=sed&sapien=lacus&urna=morbi",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Yénora",
                "type": "artist",
                "uri": "https://aol.com/orci.json?ac=quis&neque=tortor&duis=id&bibendum=nulla&morbi=ultrices&non=aliquet&quam=maecenas&nec=leo&dui=odio&luctus=condimentum&rutrum=id&nulla=luctus&tellus=nec&in=molestie&sagittis=sed&dui=justo&vel=pellentesque&nisl=viverra&duis=pede&ac=ac&nibh=diam&fusce=cras&lacus=pellentesque&purus=volutpat&aliquet=dui&at=maecenas&feugiat=tristique&non=est&pretium=et&quis=tempus&lectus=semper&suspendisse=est&potenti=quam&in=pharetra&eleifend=magna&quam=ac&a=consequat&odio=metus&in=sapien&hac=ut&habitasse=nunc&platea=vestibulum&dictumst=ante&maecenas=ipsum&ut=primis&massa=in&quis=faucibus&augue=orci"
            }
        ],
        "available_markets": "NO"
    }, {
        "album_type": "Mrs",
        "artists": [
            {
                "external_urls": {
                    "spotify": "https://alexa.com/libero/rutrum.xml?erat=lacus&tortor=at&sollicitudin=turpis&mi=donec&sit=posuere&amet=metus&lobortis=vitae&sapien=ipsum&sapien=aliquam&non=non&mi=mauris&integer=morbi&ac=non&neque=lectus&duis=aliquam&bibendum=sit&morbi=amet&non=diam&quam=in&nec=magna&dui=bibendum&luctus=imperdiet"
                },
                "href": "http://surveymonkey.com/convallis/morbi/odio/odio/elementum/eu/interdum.aspx?sed=parturient&ante=montes&vivamus=nascetur&tortor=ridiculus&duis=mus&mattis=etiam&egestas=vel&metus=augue&aenean=vestibulum&fermentum=rutrum&donec=rutrum&ut=neque&mauris=aenean&eget=auctor&massa=gravida&tempor=sem&convallis=praesent&nulla=id&neque=massa&libero=id&convallis=nisl&eget=venenatis&eleifend=lacinia&luctus=aenean&ultricies=sit&eu=amet&nibh=justo&quisque=morbi&id=ut&justo=odio&sit=cras&amet=mi&sapien=pede&dignissim=malesuada&vestibulum=in&vestibulum=imperdiet&ante=et&ipsum=commodo&primis=vulputate&in=justo&faucibus=in&orci=blandit&luctus=ultrices&et=enim&ultrices=lorem&posuere=ipsum&cubilia=dolor&curae=sit&nulla=amet&dapibus=consectetuer&dolor=adipiscing&vel=elit&est=proin&donec=interdum&odio=mauris&justo=non",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Bérangère",
                "type": "artist",
                "uri": "https://admin.ch/convallis/tortor/risus/dapibus/augue.jsp?duis=faucibus&ac=accumsan&nibh=odio&fusce=curabitur&lacus=convallis&purus=duis&aliquet=consequat&at=dui&feugiat=nec&non=nisi&pretium=volutpat&quis=eleifend&lectus=donec&suspendisse=ut&potenti=dolor&in=morbi&eleifend=vel&quam=lectus&a=in&odio=quam&in=fringilla&hac=rhoncus&habitasse=mauris&platea=enim&dictumst=leo&maecenas=rhoncus&ut=sed&massa=vestibulum&quis=sit&augue=amet&luctus=cursus&tincidunt=id&nulla=turpis&mollis=integer&molestie=aliquet&lorem=massa&quisque=id&ut=lobortis&erat=convallis&curabitur=tortor&gravida=risus&nisi=dapibus&at=augue&nibh=vel&in=accumsan&hac=tellus&habitasse=nisi&platea=eu&dictumst=orci&aliquam=mauris&augue=lacinia&quam=sapien&sollicitudin=quis&vitae=libero&consectetuer=nullam&eget=sit&rutrum=amet&at=turpis&lorem=elementum&integer=ligula&tincidunt=vehicula"
            }
        ],
        "available_markets": "LV"
    }, {
        "album_type": "Mr",
        "artists": [
            {
                "external_urls": {
                    "spotify": "http://amazon.co.uk/at/diam.json?cum=vivamus&sociis=vestibulum&natoque=sagittis&penatibus=sapien&et=cum&magnis=sociis&dis=natoque&parturient=penatibus&montes=et&nascetur=magnis&ridiculus=dis&mus=parturient&vivamus=montes&vestibulum=nascetur&sagittis=ridiculus&sapien=mus&cum=etiam&sociis=vel&natoque=augue&penatibus=vestibulum&et=rutrum&magnis=rutrum&dis=neque&parturient=aenean&montes=auctor&nascetur=gravida&ridiculus=sem&mus=praesent&etiam=id&vel=massa&augue=id&vestibulum=nisl&rutrum=venenatis&rutrum=lacinia&neque=aenean&aenean=sit&auctor=amet&gravida=justo&sem=morbi&praesent=ut&id=odio&massa=cras&id=mi&nisl=pede&venenatis=malesuada&lacinia=in&aenean=imperdiet&sit=et&amet=commodo&justo=vulputate&morbi=justo&ut=in&odio=blandit&cras=ultrices&mi=enim&pede=lorem&malesuada=ipsum&in=dolor&imperdiet=sit&et=amet&commodo=consectetuer&vulputate=adipiscing"
                },
                "href": "https://twitter.com/dolor/sit/amet/consectetuer/adipiscing.xml?pulvinar=metus&lobortis=vitae&est=ipsum&phasellus=aliquam&sit=non&amet=mauris&erat=morbi&nulla=non&tempus=lectus&vivamus=aliquam&in=sit&felis=amet&eu=diam&sapien=in&cursus=magna&vestibulum=bibendum&proin=imperdiet&eu=nullam&mi=orci&nulla=pede&ac=venenatis&enim=non&in=sodales&tempor=sed&turpis=tincidunt&nec=eu&euismod=felis",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Tú",
                "type": "artist",
                "uri": "https://a8.net/quam/suspendisse/potenti/nullam/porttitor/lacus/at.aspx?mattis=justo&nibh=eu&ligula=massa&nec=donec&sem=dapibus&duis=duis&aliquam=at&convallis=velit&nunc=eu&proin=est&at=congue&turpis=elementum&a=in&pede=hac&posuere=habitasse&nonummy=platea&integer=dictumst&non=morbi&velit=vestibulum&donec=velit&diam=id&neque=pretium&vestibulum=iaculis&eget=diam&vulputate=erat&ut=fermentum&ultrices=justo&vel=nec&augue=condimentum&vestibulum=neque&ante=sapien"
            }
        ],
        "available_markets": "JP"
    }, {
        "album_type": "Dr",
        "artists": [
            {
                "external_urls": {
                    "spotify": "https://pbs.org/vel.jpg?duis=commodo&at=vulputate&velit=justo&eu=in&est=blandit&congue=ultrices&elementum=enim&in=lorem&hac=ipsum&habitasse=dolor&platea=sit&dictumst=amet&morbi=consectetuer&vestibulum=adipiscing&velit=elit&id=proin&pretium=interdum&iaculis=mauris&diam=non&erat=ligula&fermentum=pellentesque&justo=ultrices&nec=phasellus&condimentum=id&neque=sapien&sapien=in&placerat=sapien&ante=iaculis"
                },
                "href": "http://msn.com/ipsum/primis/in.xml?aenean=justo&fermentum=maecenas",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Pénélope",
                "type": "artist",
                "uri": "http://sbwire.com/nulla/tempus/vivamus/in/felis/eu.jpg?nulla=ipsum&ac=praesent&enim=blandit&in=lacinia&tempor=erat&turpis=vestibulum&nec=sed&euismod=magna&scelerisque=at&quam=nunc&turpis=commodo&adipiscing=placerat&lorem=praesent&vitae=blandit&mattis=nam&nibh=nulla&ligula=integer&nec=pede&sem=justo&duis=lacinia&aliquam=eget&convallis=tincidunt&nunc=eget&proin=tempus&at=vel&turpis=pede&a=morbi&pede=porttitor&posuere=lorem&nonummy=id&integer=ligula&non=suspendisse&velit=ornare&donec=consequat&diam=lectus&neque=in&vestibulum=est&eget=risus&vulputate=auctor&ut=sed&ultrices=tristique&vel=in&augue=tempus&vestibulum=sit&ante=amet&ipsum=sem&primis=fusce&in=consequat&faucibus=nulla&orci=nisl&luctus=nunc&et=nisl&ultrices=duis&posuere=bibendum&cubilia=felis&curae=sed&donec=interdum&pharetra=venenatis&magna=turpis&vestibulum=enim&aliquet=blandit&ultrices=mi&erat=in&tortor=porttitor&sollicitudin=pede&mi=justo&sit=eu&amet=massa&lobortis=donec&sapien=dapibus&sapien=duis&non=at&mi=velit&integer=eu&ac=est&neque=congue&duis=elementum&bibendum=in&morbi=hac&non=habitasse&quam=platea&nec=dictumst&dui=morbi&luctus=vestibulum&rutrum=velit&nulla=id&tellus=pretium&in=iaculis&sagittis=diam&dui=erat&vel=fermentum&nisl=justo&duis=nec&ac=condimentum&nibh=neque&fusce=sapien&lacus=placerat&purus=ante&aliquet=nulla"
            }
        ],
        "available_markets": "EG"
    }, {
        "album_type": "Ms",
        "artists": [
            {
                "external_urls": {
                    "spotify": "https://mapy.cz/eleifend/luctus/ultricies.aspx?lacinia=pede&sapien=justo&quis=eu&libero=massa&nullam=donec&sit=dapibus&amet=duis&turpis=at&elementum=velit&ligula=eu&vehicula=est&consequat=congue&morbi=elementum&a=in&ipsum=hac&integer=habitasse&a=platea&nibh=dictumst&in=morbi&quis=vestibulum&justo=velit&maecenas=id&rhoncus=pretium&aliquam=iaculis&lacus=diam&morbi=erat&quis=fermentum&tortor=justo&id=nec&nulla=condimentum&ultrices=neque&aliquet=sapien&maecenas=placerat&leo=ante&odio=nulla&condimentum=justo&id=aliquam&luctus=quis&nec=turpis&molestie=eget&sed=elit&justo=sodales&pellentesque=scelerisque&viverra=mauris&pede=sit&ac=amet&diam=eros&cras=suspendisse&pellentesque=accumsan&volutpat=tortor&dui=quis&maecenas=turpis&tristique=sed&est=ante&et=vivamus&tempus=tortor&semper=duis&est=mattis&quam=egestas&pharetra=metus&magna=aenean&ac=fermentum&consequat=donec&metus=ut&sapien=mauris&ut=eget&nunc=massa&vestibulum=tempor&ante=convallis&ipsum=nulla&primis=neque&in=libero&faucibus=convallis&orci=eget"
                },
                "href": "https://nymag.com/magnis.jpg?eu=felis&felis=ut&fusce=at&posuere=dolor&felis=quis&sed=odio&lacus=consequat&morbi=varius&sem=integer&mauris=ac&laoreet=leo&ut=pellentesque&rhoncus=ultrices&aliquet=mattis&pulvinar=odio&sed=donec&nisl=vitae&nunc=nisi&rhoncus=nam&dui=ultrices&vel=libero&sem=non&sed=mattis&sagittis=pulvinar&nam=nulla&congue=pede&risus=ullamcorper&semper=augue&porta=a&volutpat=suscipit&quam=nulla&pede=elit&lobortis=ac&ligula=nulla&sit=sed&amet=vel&eleifend=enim&pede=sit&libero=amet&quis=nunc&orci=viverra&nullam=dapibus&molestie=nulla&nibh=suscipit&in=ligula&lectus=in&pellentesque=lacus&at=curabitur&nulla=at&suspendisse=ipsum&potenti=ac&cras=tellus&in=semper&purus=interdum&eu=mauris&magna=ullamcorper&vulputate=purus&luctus=sit&cum=amet&sociis=nulla&natoque=quisque&penatibus=arcu&et=libero&magnis=rutrum&dis=ac&parturient=lobortis&montes=vel",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Görel",
                "type": "artist",
                "uri": "https://harvard.edu/sit/amet/eleifend/pede.json?eu=nisi&tincidunt=vulputate&in=nonummy&leo=maecenas&maecenas=tincidunt&pulvinar=lacus&lobortis=at&est=velit&phasellus=vivamus&sit=vel&amet=nulla&erat=eget&nulla=eros&tempus=elementum&vivamus=pellentesque&in=quisque&felis=porta&eu=volutpat&sapien=erat&cursus=quisque&vestibulum=erat&proin=eros"
            }
        ],
        "available_markets": "LI"
    }, {
        "album_type": "Dr",
        "artists": [
            {
                "external_urls": {
                    "spotify": "https://reuters.com/sed.aspx?enim=volutpat&blandit=in&mi=congue&in=etiam&porttitor=justo&pede=etiam&justo=pretium&eu=iaculis&massa=justo&donec=in&dapibus=hac&duis=habitasse&at=platea&velit=dictumst&eu=etiam&est=faucibus&congue=cursus&elementum=urna&in=ut&hac=tellus&habitasse=nulla&platea=ut&dictumst=erat&morbi=id&vestibulum=mauris&velit=vulputate&id=elementum&pretium=nullam&iaculis=varius&diam=nulla&erat=facilisi&fermentum=cras&justo=non&nec=velit"
                },
                "href": "https://hatena.ne.jp/quis/turpis/eget/elit.html?potenti=gravida&in=sem&eleifend=praesent&quam=id&a=massa&odio=id&in=nisl&hac=venenatis&habitasse=lacinia&platea=aenean&dictumst=sit&maecenas=amet&ut=justo&massa=morbi&quis=ut&augue=odio&luctus=cras&tincidunt=mi&nulla=pede&mollis=malesuada&molestie=in&lorem=imperdiet&quisque=et&ut=commodo&erat=vulputate&curabitur=justo&gravida=in&nisi=blandit&at=ultrices&nibh=enim&in=lorem&hac=ipsum&habitasse=dolor&platea=sit&dictumst=amet&aliquam=consectetuer&augue=adipiscing&quam=elit&sollicitudin=proin&vitae=interdum&consectetuer=mauris&eget=non&rutrum=ligula",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Åke",
                "type": "artist",
                "uri": "https://123-reg.co.uk/vel/nulla/eget/eros/elementum.aspx?praesent=nec&blandit=euismod&lacinia=scelerisque&erat=quam&vestibulum=turpis&sed=adipiscing&magna=lorem&at=vitae&nunc=mattis&commodo=nibh&placerat=ligula&praesent=nec&blandit=sem&nam=duis&nulla=aliquam&integer=convallis&pede=nunc&justo=proin&lacinia=at&eget=turpis&tincidunt=a&eget=pede&tempus=posuere&vel=nonummy&pede=integer&morbi=non&porttitor=velit&lorem=donec&id=diam&ligula=neque&suspendisse=vestibulum&ornare=eget&consequat=vulputate&lectus=ut&in=ultrices&est=vel&risus=augue&auctor=vestibulum&sed=ante&tristique=ipsum&in=primis&tempus=in&sit=faucibus&amet=orci&sem=luctus&fusce=et&consequat=ultrices&nulla=posuere&nisl=cubilia&nunc=curae&nisl=donec&duis=pharetra&bibendum=magna&felis=vestibulum&sed=aliquet&interdum=ultrices&venenatis=erat&turpis=tortor&enim=sollicitudin&blandit=mi&mi=sit&in=amet&porttitor=lobortis&pede=sapien&justo=sapien&eu=non&massa=mi&donec=integer&dapibus=ac&duis=neque"
            }
        ],
        "available_markets": "PT"
    }, {
        "album_type": "Honorable",
        "artists": [
            {
                "external_urls": {
                    "spotify": "http://wix.com/ut/rhoncus/aliquet/pulvinar/sed.jpg?sodales=eros&sed=viverra&tincidunt=eget&eu=congue&felis=eget&fusce=semper&posuere=rutrum&felis=nulla&sed=nunc&lacus=purus&morbi=phasellus&sem=in&mauris=felis&laoreet=donec&ut=semper&rhoncus=sapien&aliquet=a&pulvinar=libero&sed=nam&nisl=dui&nunc=proin&rhoncus=leo&dui=odio&vel=porttitor&sem=id&sed=consequat&sagittis=in&nam=consequat&congue=ut&risus=nulla&semper=sed&porta=accumsan&volutpat=felis&quam=ut&pede=at&lobortis=dolor&ligula=quis&sit=odio&amet=consequat&eleifend=varius&pede=integer&libero=ac&quis=leo&orci=pellentesque&nullam=ultrices&molestie=mattis&nibh=odio&in=donec&lectus=vitae&pellentesque=nisi&at=nam&nulla=ultrices&suspendisse=libero&potenti=non&cras=mattis&in=pulvinar&purus=nulla&eu=pede&magna=ullamcorper&vulputate=augue&luctus=a&cum=suscipit&sociis=nulla&natoque=elit"
                },
                "href": "http://si.edu/hendrerit/at/vulputate/vitae.xml?pharetra=in&magna=quam&vestibulum=fringilla&aliquet=rhoncus&ultrices=mauris&erat=enim&tortor=leo&sollicitudin=rhoncus&mi=sed&sit=vestibulum&amet=sit&lobortis=amet&sapien=cursus&sapien=id&non=turpis&mi=integer",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Célia",
                "type": "artist",
                "uri": "https://vistaprint.com/sapien/sapien/non/mi/integer.xml?venenatis=lacus&turpis=at&enim=turpis&blandit=donec&mi=posuere&in=metus&porttitor=vitae&pede=ipsum&justo=aliquam&eu=non&massa=mauris&donec=morbi&dapibus=non&duis=lectus&at=aliquam&velit=sit&eu=amet&est=diam&congue=in&elementum=magna&in=bibendum&hac=imperdiet&habitasse=nullam&platea=orci&dictumst=pede&morbi=venenatis&vestibulum=non&velit=sodales&id=sed&pretium=tincidunt&iaculis=eu&diam=felis&erat=fusce&fermentum=posuere&justo=felis&nec=sed&condimentum=lacus&neque=morbi&sapien=sem&placerat=mauris&ante=laoreet&nulla=ut&justo=rhoncus&aliquam=aliquet&quis=pulvinar&turpis=sed&eget=nisl&elit=nunc&sodales=rhoncus&scelerisque=dui&mauris=vel&sit=sem&amet=sed&eros=sagittis&suspendisse=nam&accumsan=congue&tortor=risus&quis=semper&turpis=porta&sed=volutpat&ante=quam&vivamus=pede&tortor=lobortis&duis=ligula&mattis=sit&egestas=amet&metus=eleifend&aenean=pede&fermentum=libero&donec=quis&ut=orci&mauris=nullam&eget=molestie&massa=nibh&tempor=in&convallis=lectus&nulla=pellentesque&neque=at&libero=nulla&convallis=suspendisse&eget=potenti&eleifend=cras&luctus=in&ultricies=purus&eu=eu&nibh=magna&quisque=vulputate&id=luctus&justo=cum&sit=sociis&amet=natoque&sapien=penatibus&dignissim=et&vestibulum=magnis&vestibulum=dis&ante=parturient&ipsum=montes&primis=nascetur"
            }
        ],
        "available_markets": "FR"
    }, {
        "album_type": "Ms",
        "artists": [
            {
                "external_urls": {
                    "spotify": "http://businesswire.com/vestibulum/rutrum/rutrum/neque/aenean.jpg?ac=consequat&nibh=ut&fusce=nulla&lacus=sed&purus=accumsan&aliquet=felis&at=ut&feugiat=at&non=dolor&pretium=quis&quis=odio&lectus=consequat&suspendisse=varius&potenti=integer&in=ac&eleifend=leo&quam=pellentesque&a=ultrices&odio=mattis&in=odio&hac=donec&habitasse=vitae&platea=nisi&dictumst=nam&maecenas=ultrices&ut=libero&massa=non&quis=mattis&augue=pulvinar&luctus=nulla&tincidunt=pede&nulla=ullamcorper&mollis=augue&molestie=a&lorem=suscipit&quisque=nulla&ut=elit&erat=ac&curabitur=nulla&gravida=sed&nisi=vel&at=enim&nibh=sit&in=amet&hac=nunc&habitasse=viverra&platea=dapibus"
                },
                "href": "https://google.it/porta/volutpat/erat/quisque/erat/eros/viverra.json?at=id&lorem=luctus&integer=nec&tincidunt=molestie&ante=sed&vel=justo&ipsum=pellentesque&praesent=viverra&blandit=pede&lacinia=ac&erat=diam&vestibulum=cras&sed=pellentesque&magna=volutpat&at=dui&nunc=maecenas&commodo=tristique&placerat=est&praesent=et&blandit=tempus&nam=semper&nulla=est&integer=quam&pede=pharetra&justo=magna&lacinia=ac&eget=consequat&tincidunt=metus&eget=sapien&tempus=ut&vel=nunc&pede=vestibulum&morbi=ante&porttitor=ipsum&lorem=primis&id=in&ligula=faucibus&suspendisse=orci&ornare=luctus&consequat=et&lectus=ultrices&in=posuere&est=cubilia&risus=curae&auctor=mauris&sed=viverra&tristique=diam&in=vitae&tempus=quam&sit=suspendisse&amet=potenti&sem=nullam&fusce=porttitor&consequat=lacus&nulla=at&nisl=turpis&nunc=donec&nisl=posuere&duis=metus&bibendum=vitae&felis=ipsum&sed=aliquam&interdum=non&venenatis=mauris&turpis=morbi&enim=non&blandit=lectus&mi=aliquam&in=sit&porttitor=amet&pede=diam&justo=in&eu=magna&massa=bibendum&donec=imperdiet&dapibus=nullam&duis=orci&at=pede&velit=venenatis&eu=non&est=sodales&congue=sed",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Médiamass",
                "type": "artist",
                "uri": "http://skype.com/amet/sapien/dignissim.jsp?condimentum=tortor&curabitur=sollicitudin&in=mi&libero=sit&ut=amet&massa=lobortis&volutpat=sapien&convallis=sapien&morbi=non&odio=mi&odio=integer&elementum=ac&eu=neque&interdum=duis&eu=bibendum&tincidunt=morbi&in=non&leo=quam&maecenas=nec&pulvinar=dui&lobortis=luctus&est=rutrum&phasellus=nulla&sit=tellus&amet=in&erat=sagittis&nulla=dui&tempus=vel&vivamus=nisl&in=duis&felis=ac&eu=nibh&sapien=fusce&cursus=lacus&vestibulum=purus&proin=aliquet&eu=at&mi=feugiat&nulla=non&ac=pretium&enim=quis&in=lectus&tempor=suspendisse&turpis=potenti"
            }
        ],
        "available_markets": "TR"
    }, {
        "album_type": "Rev",
        "artists": [
            {
                "external_urls": {
                    "spotify": "http://diigo.com/et/ultrices/posuere/cubilia.aspx?elementum=mauris&ligula=laoreet&vehicula=ut&consequat=rhoncus&morbi=aliquet&a=pulvinar&ipsum=sed&integer=nisl&a=nunc&nibh=rhoncus&in=dui&quis=vel&justo=sem&maecenas=sed&rhoncus=sagittis&aliquam=nam&lacus=congue&morbi=risus&quis=semper&tortor=porta&id=volutpat&nulla=quam&ultrices=pede&aliquet=lobortis&maecenas=ligula&leo=sit&odio=amet&condimentum=eleifend&id=pede&luctus=libero&nec=quis&molestie=orci&sed=nullam&justo=molestie&pellentesque=nibh&viverra=in&pede=lectus&ac=pellentesque&diam=at&cras=nulla&pellentesque=suspendisse&volutpat=potenti&dui=cras&maecenas=in&tristique=purus&est=eu&et=magna&tempus=vulputate&semper=luctus"
                },
                "href": "http://columbia.edu/mauris/sit/amet/eros/suspendisse.json?accumsan=risus&tellus=praesent&nisi=lectus&eu=vestibulum&orci=quam&mauris=sapien&lacinia=varius&sapien=ut&quis=blandit&libero=non&nullam=interdum&sit=in&amet=ante&turpis=vestibulum&elementum=ante&ligula=ipsum&vehicula=primis&consequat=in",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Audréanne",
                "type": "artist",
                "uri": "http://ca.gov/sed.html?gravida=vel&sem=ipsum&praesent=praesent&id=blandit&massa=lacinia&id=erat&nisl=vestibulum&venenatis=sed&lacinia=magna&aenean=at&sit=nunc&amet=commodo&justo=placerat&morbi=praesent&ut=blandit&odio=nam&cras=nulla&mi=integer&pede=pede&malesuada=justo&in=lacinia&imperdiet=eget&et=tincidunt&commodo=eget&vulputate=tempus&justo=vel&in=pede&blandit=morbi&ultrices=porttitor&enim=lorem&lorem=id&ipsum=ligula&dolor=suspendisse&sit=ornare&amet=consequat&consectetuer=lectus&adipiscing=in&elit=est&proin=risus&interdum=auctor&mauris=sed&non=tristique&ligula=in&pellentesque=tempus&ultrices=sit&phasellus=amet&id=sem&sapien=fusce&in=consequat&sapien=nulla&iaculis=nisl&congue=nunc&vivamus=nisl&metus=duis&arcu=bibendum&adipiscing=felis&molestie=sed&hendrerit=interdum&at=venenatis&vulputate=turpis&vitae=enim&nisl=blandit&aenean=mi&lectus=in&pellentesque=porttitor&eget=pede&nunc=justo&donec=eu&quis=massa&orci=donec&eget=dapibus&orci=duis&vehicula=at&condimentum=velit&curabitur=eu&in=est&libero=congue&ut=elementum&massa=in&volutpat=hac&convallis=habitasse&morbi=platea&odio=dictumst&odio=morbi&elementum=vestibulum&eu=velit&interdum=id&eu=pretium&tincidunt=iaculis&in=diam&leo=erat&maecenas=fermentum&pulvinar=justo"
            }
        ],
        "available_markets": "AU"
    }, {
        "album_type": "Mr",
        "artists": [
            {
                "external_urls": {
                    "spotify": "http://miitbeian.gov.cn/viverra/pede/ac/diam/cras/pellentesque/volutpat.aspx?purus=duis&aliquet=at&at=velit&feugiat=eu&non=est&pretium=congue&quis=elementum&lectus=in&suspendisse=hac&potenti=habitasse&in=platea&eleifend=dictumst&quam=morbi&a=vestibulum&odio=velit&in=id&hac=pretium&habitasse=iaculis&platea=diam&dictumst=erat&maecenas=fermentum&ut=justo&massa=nec&quis=condimentum&augue=neque&luctus=sapien&tincidunt=placerat&nulla=ante&mollis=nulla&molestie=justo&lorem=aliquam&quisque=quis&ut=turpis&erat=eget&curabitur=elit&gravida=sodales&nisi=scelerisque&at=mauris&nibh=sit&in=amet&hac=eros&habitasse=suspendisse&platea=accumsan&dictumst=tortor&aliquam=quis&augue=turpis&quam=sed&sollicitudin=ante&vitae=vivamus&consectetuer=tortor&eget=duis&rutrum=mattis&at=egestas&lorem=metus&integer=aenean&tincidunt=fermentum&ante=donec&vel=ut&ipsum=mauris&praesent=eget&blandit=massa&lacinia=tempor&erat=convallis&vestibulum=nulla&sed=neque&magna=libero&at=convallis&nunc=eget&commodo=eleifend&placerat=luctus&praesent=ultricies&blandit=eu&nam=nibh&nulla=quisque&integer=id&pede=justo&justo=sit&lacinia=amet&eget=sapien&tincidunt=dignissim&eget=vestibulum&tempus=vestibulum&vel=ante&pede=ipsum&morbi=primis&porttitor=in&lorem=faucibus&id=orci&ligula=luctus&suspendisse=et&ornare=ultrices&consequat=posuere&lectus=cubilia&in=curae&est=nulla&risus=dapibus"
                },
                "href": "http://latimes.com/ante/ipsum/primis/in/faucibus/orci/luctus.jpg?penatibus=eleifend&et=luctus&magnis=ultricies&dis=eu&parturient=nibh&montes=quisque&nascetur=id&ridiculus=justo&mus=sit&vivamus=amet&vestibulum=sapien&sagittis=dignissim&sapien=vestibulum&cum=vestibulum&sociis=ante&natoque=ipsum&penatibus=primis&et=in&magnis=faucibus&dis=orci&parturient=luctus&montes=et&nascetur=ultrices&ridiculus=posuere&mus=cubilia&etiam=curae&vel=nulla&augue=dapibus&vestibulum=dolor&rutrum=vel&rutrum=est&neque=donec&aenean=odio&auctor=justo&gravida=sollicitudin&sem=ut&praesent=suscipit&id=a&massa=feugiat&id=et&nisl=eros&venenatis=vestibulum&lacinia=ac&aenean=est&sit=lacinia&amet=nisi&justo=venenatis&morbi=tristique&ut=fusce&odio=congue&cras=diam&mi=id&pede=ornare&malesuada=imperdiet&in=sapien&imperdiet=urna&et=pretium&commodo=nisl&vulputate=ut&justo=volutpat&in=sapien&blandit=arcu&ultrices=sed&enim=augue&lorem=aliquam&ipsum=erat&dolor=volutpat&sit=in&amet=congue&consectetuer=etiam&adipiscing=justo&elit=etiam",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Gérald",
                "type": "artist",
                "uri": "http://xing.com/ante/ipsum/primis/in/faucibus/orci.png?facilisi=dui&cras=proin&non=leo&velit=odio"
            }
        ],
        "available_markets": "LU"
    }, {
        "album_type": "Dr",
        "artists": [
            {
                "external_urls": {
                    "spotify": "https://chicagotribune.com/diam/in/magna/bibendum.html?cubilia=mi&curae=nulla&nulla=ac&dapibus=enim&dolor=in&vel=tempor&est=turpis&donec=nec&odio=euismod&justo=scelerisque&sollicitudin=quam&ut=turpis&suscipit=adipiscing&a=lorem&feugiat=vitae&et=mattis&eros=nibh&vestibulum=ligula&ac=nec&est=sem&lacinia=duis&nisi=aliquam&venenatis=convallis&tristique=nunc&fusce=proin&congue=at&diam=turpis&id=a&ornare=pede&imperdiet=posuere&sapien=nonummy&urna=integer&pretium=non&nisl=velit&ut=donec&volutpat=diam&sapien=neque&arcu=vestibulum&sed=eget&augue=vulputate&aliquam=ut&erat=ultrices&volutpat=vel&in=augue&congue=vestibulum&etiam=ante&justo=ipsum&etiam=primis&pretium=in&iaculis=faucibus&justo=orci&in=luctus&hac=et&habitasse=ultrices&platea=posuere&dictumst=cubilia&etiam=curae&faucibus=donec"
                },
                "href": "http://unblog.fr/odio.jpg?donec=ultrices&dapibus=enim&duis=lorem&at=ipsum&velit=dolor&eu=sit&est=amet&congue=consectetuer&elementum=adipiscing&in=elit&hac=proin&habitasse=interdum&platea=mauris&dictumst=non&morbi=ligula",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Marie-josée",
                "type": "artist",
                "uri": "https://trellian.com/pede/posuere/nonummy.png?adipiscing=duis&molestie=consequat&hendrerit=dui&at=nec&vulputate=nisi&vitae=volutpat&nisl=eleifend&aenean=donec&lectus=ut&pellentesque=dolor&eget=morbi&nunc=vel&donec=lectus&quis=in&orci=quam&eget=fringilla&orci=rhoncus&vehicula=mauris&condimentum=enim&curabitur=leo&in=rhoncus&libero=sed&ut=vestibulum&massa=sit&volutpat=amet&convallis=cursus&morbi=id&odio=turpis&odio=integer&elementum=aliquet&eu=massa&interdum=id&eu=lobortis&tincidunt=convallis&in=tortor&leo=risus&maecenas=dapibus&pulvinar=augue&lobortis=vel&est=accumsan&phasellus=tellus&sit=nisi&amet=eu&erat=orci&nulla=mauris&tempus=lacinia&vivamus=sapien&in=quis&felis=libero&eu=nullam&sapien=sit&cursus=amet&vestibulum=turpis&proin=elementum&eu=ligula&mi=vehicula&nulla=consequat&ac=morbi&enim=a&in=ipsum&tempor=integer&turpis=a&nec=nibh&euismod=in&scelerisque=quis&quam=justo&turpis=maecenas&adipiscing=rhoncus&lorem=aliquam&vitae=lacus&mattis=morbi&nibh=quis&ligula=tortor&nec=id&sem=nulla&duis=ultrices&aliquam=aliquet&convallis=maecenas&nunc=leo&proin=odio&at=condimentum&turpis=id&a=luctus&pede=nec&posuere=molestie&nonummy=sed&integer=justo&non=pellentesque&velit=viverra&donec=pede&diam=ac&neque=diam&vestibulum=cras&eget=pellentesque&vulputate=volutpat"
            }
        ],
        "available_markets": "LI"
    }, {
        "album_type": "Mr",
        "artists": [
            {
                "external_urls": {
                    "spotify": "https://jugem.jp/accumsan/odio.jsp?amet=nisl&nunc=duis&viverra=ac&dapibus=nibh&nulla=fusce&suscipit=lacus&ligula=purus"
                },
                "href": "https://php.net/elit/proin.jpg?aliquam=eleifend&quis=quam&turpis=a&eget=odio&elit=in&sodales=hac&scelerisque=habitasse&mauris=platea&sit=dictumst&amet=maecenas&eros=ut&suspendisse=massa&accumsan=quis&tortor=augue&quis=luctus&turpis=tincidunt&sed=nulla&ante=mollis&vivamus=molestie&tortor=lorem&duis=quisque&mattis=ut&egestas=erat&metus=curabitur&aenean=gravida&fermentum=nisi&donec=at&ut=nibh&mauris=in&eget=hac&massa=habitasse&tempor=platea&convallis=dictumst&nulla=aliquam&neque=augue&libero=quam&convallis=sollicitudin&eget=vitae&eleifend=consectetuer&luctus=eget&ultricies=rutrum&eu=at&nibh=lorem&quisque=integer&id=tincidunt&justo=ante&sit=vel&amet=ipsum&sapien=praesent&dignissim=blandit&vestibulum=lacinia&vestibulum=erat&ante=vestibulum&ipsum=sed&primis=magna&in=at&faucibus=nunc&orci=commodo&luctus=placerat&et=praesent&ultrices=blandit&posuere=nam&cubilia=nulla&curae=integer&nulla=pede&dapibus=justo&dolor=lacinia&vel=eget&est=tincidunt&donec=eget&odio=tempus&justo=vel&sollicitudin=pede&ut=morbi&suscipit=porttitor&a=lorem&feugiat=id&et=ligula&eros=suspendisse&vestibulum=ornare&ac=consequat&est=lectus&lacinia=in&nisi=est&venenatis=risus&tristique=auctor&fusce=sed",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Réservés",
                "type": "artist",
                "uri": "https://youku.com/pede/libero/quis.png?auctor=magna&sed=at&tristique=nunc&in=commodo&tempus=placerat&sit=praesent&amet=blandit&sem=nam&fusce=nulla&consequat=integer&nulla=pede&nisl=justo&nunc=lacinia&nisl=eget&duis=tincidunt&bibendum=eget&felis=tempus&sed=vel&interdum=pede&venenatis=morbi&turpis=porttitor&enim=lorem&blandit=id&mi=ligula&in=suspendisse&porttitor=ornare&pede=consequat&justo=lectus&eu=in&massa=est&donec=risus&dapibus=auctor&duis=sed&at=tristique&velit=in&eu=tempus&est=sit&congue=amet&elementum=sem&in=fusce&hac=consequat&habitasse=nulla&platea=nisl&dictumst=nunc&morbi=nisl&vestibulum=duis&velit=bibendum&id=felis&pretium=sed&iaculis=interdum&diam=venenatis&erat=turpis&fermentum=enim&justo=blandit&nec=mi"
            }
        ],
        "available_markets": "DZ"
    }, {
        "album_type": "Ms",
        "artists": [
            {
                "external_urls": {
                    "spotify": "http://github.com/ultrices/posuere/cubilia/curae/donec.aspx?dui=velit&nec=eu&nisi=est&volutpat=congue&eleifend=elementum&donec=in&ut=hac&dolor=habitasse&morbi=platea&vel=dictumst&lectus=morbi&in=vestibulum&quam=velit&fringilla=id&rhoncus=pretium&mauris=iaculis&enim=diam&leo=erat&rhoncus=fermentum&sed=justo&vestibulum=nec&sit=condimentum&amet=neque&cursus=sapien&id=placerat&turpis=ante&integer=nulla&aliquet=justo&massa=aliquam&id=quis&lobortis=turpis&convallis=eget&tortor=elit&risus=sodales&dapibus=scelerisque&augue=mauris&vel=sit&accumsan=amet&tellus=eros&nisi=suspendisse&eu=accumsan&orci=tortor&mauris=quis&lacinia=turpis&sapien=sed&quis=ante&libero=vivamus&nullam=tortor&sit=duis&amet=mattis&turpis=egestas&elementum=metus&ligula=aenean&vehicula=fermentum&consequat=donec&morbi=ut&a=mauris&ipsum=eget&integer=massa&a=tempor&nibh=convallis&in=nulla&quis=neque&justo=libero&maecenas=convallis&rhoncus=eget&aliquam=eleifend&lacus=luctus&morbi=ultricies&quis=eu&tortor=nibh&id=quisque&nulla=id&ultrices=justo&aliquet=sit&maecenas=amet&leo=sapien&odio=dignissim&condimentum=vestibulum&id=vestibulum&luctus=ante&nec=ipsum&molestie=primis"
                },
                "href": "http://networkadvertising.org/curae/nulla/dapibus.json?pellentesque=felis&at=eu&nulla=sapien&suspendisse=cursus&potenti=vestibulum&cras=proin&in=eu&purus=mi&eu=nulla&magna=ac&vulputate=enim&luctus=in&cum=tempor&sociis=turpis&natoque=nec&penatibus=euismod&et=scelerisque&magnis=quam&dis=turpis&parturient=adipiscing&montes=lorem&nascetur=vitae&ridiculus=mattis&mus=nibh&vivamus=ligula&vestibulum=nec&sagittis=sem&sapien=duis&cum=aliquam&sociis=convallis&natoque=nunc&penatibus=proin&et=at&magnis=turpis&dis=a&parturient=pede&montes=posuere&nascetur=nonummy&ridiculus=integer&mus=non&etiam=velit&vel=donec&augue=diam&vestibulum=neque&rutrum=vestibulum&rutrum=eget&neque=vulputate&aenean=ut&auctor=ultrices&gravida=vel&sem=augue&praesent=vestibulum&id=ante&massa=ipsum&id=primis&nisl=in&venenatis=faucibus&lacinia=orci&aenean=luctus&sit=et&amet=ultrices&justo=posuere&morbi=cubilia&ut=curae&odio=donec&cras=pharetra&mi=magna&pede=vestibulum",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Håkan",
                "type": "artist",
                "uri": "https://linkedin.com/ac/nulla/sed/vel/enim/sit.png?primis=amet&in=cursus&faucibus=id&orci=turpis&luctus=integer&et=aliquet&ultrices=massa&posuere=id&cubilia=lobortis&curae=convallis&nulla=tortor&dapibus=risus&dolor=dapibus&vel=augue&est=vel&donec=accumsan&odio=tellus&justo=nisi&sollicitudin=eu&ut=orci&suscipit=mauris&a=lacinia&feugiat=sapien&et=quis&eros=libero&vestibulum=nullam&ac=sit&est=amet&lacinia=turpis&nisi=elementum"
            }
        ],
        "available_markets": "TH"
    }, {
        "album_type": "Honorable",
        "artists": [
            {
                "external_urls": {
                    "spotify": "http://theatlantic.com/nulla/tellus/in.jpg?gravida=leo&sem=odio&praesent=porttitor&id=id&massa=consequat&id=in&nisl=consequat&venenatis=ut&lacinia=nulla&aenean=sed&sit=accumsan&amet=felis&justo=ut&morbi=at&ut=dolor&odio=quis&cras=odio"
                },
                "href": "http://ebay.com/iaculis/justo/in/hac/habitasse/platea/dictumst.json?tellus=duis&nulla=consequat&ut=dui&erat=nec&id=nisi&mauris=volutpat&vulputate=eleifend&elementum=donec&nullam=ut&varius=dolor&nulla=morbi&facilisi=vel&cras=lectus&non=in&velit=quam&nec=fringilla&nisi=rhoncus&vulputate=mauris&nonummy=enim&maecenas=leo&tincidunt=rhoncus&lacus=sed&at=vestibulum&velit=sit&vivamus=amet&vel=cursus&nulla=id&eget=turpis&eros=integer&elementum=aliquet&pellentesque=massa&quisque=id",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Bénédicte",
                "type": "artist",
                "uri": "https://miibeian.gov.cn/quis/orci/nullam/molestie/nibh/in.html?donec=lacinia&ut=eget&dolor=tincidunt&morbi=eget"
            }
        ],
        "available_markets": "GR"
    }, {
        "album_type": "Mr",
        "artists": [
            {
                "external_urls": {
                    "spotify": "http://wufoo.com/justo/aliquam.png?dui=congue&vel=elementum&nisl=in&duis=hac&ac=habitasse&nibh=platea&fusce=dictumst&lacus=morbi&purus=vestibulum&aliquet=velit&at=id&feugiat=pretium&non=iaculis&pretium=diam&quis=erat&lectus=fermentum&suspendisse=justo&potenti=nec&in=condimentum&eleifend=neque&quam=sapien&a=placerat&odio=ante&in=nulla&hac=justo&habitasse=aliquam&platea=quis&dictumst=turpis&maecenas=eget&ut=elit&massa=sodales&quis=scelerisque&augue=mauris&luctus=sit&tincidunt=amet&nulla=eros&mollis=suspendisse"
                },
                "href": "http://guardian.co.uk/risus/auctor/sed/tristique/in.json?diam=justo&id=nec&ornare=condimentum&imperdiet=neque&sapien=sapien&urna=placerat&pretium=ante&nisl=nulla&ut=justo&volutpat=aliquam&sapien=quis&arcu=turpis&sed=eget&augue=elit&aliquam=sodales&erat=scelerisque&volutpat=mauris&in=sit&congue=amet&etiam=eros&justo=suspendisse&etiam=accumsan&pretium=tortor&iaculis=quis&justo=turpis&in=sed&hac=ante&habitasse=vivamus&platea=tortor&dictumst=duis&etiam=mattis&faucibus=egestas&cursus=metus&urna=aenean&ut=fermentum&tellus=donec&nulla=ut&ut=mauris&erat=eget&id=massa&mauris=tempor&vulputate=convallis&elementum=nulla&nullam=neque&varius=libero&nulla=convallis&facilisi=eget&cras=eleifend&non=luctus&velit=ultricies&nec=eu&nisi=nibh&vulputate=quisque&nonummy=id&maecenas=justo&tincidunt=sit&lacus=amet&at=sapien&velit=dignissim&vivamus=vestibulum&vel=vestibulum&nulla=ante&eget=ipsum&eros=primis&elementum=in&pellentesque=faucibus&quisque=orci&porta=luctus&volutpat=et&erat=ultrices&quisque=posuere&erat=cubilia&eros=curae&viverra=nulla&eget=dapibus&congue=dolor&eget=vel&semper=est&rutrum=donec&nulla=odio&nunc=justo&purus=sollicitudin&phasellus=ut&in=suscipit",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Garçon",
                "type": "artist",
                "uri": "https://imgur.com/fermentum/donec.aspx?massa=rutrum&donec=ac&dapibus=lobortis&duis=vel&at=dapibus&velit=at&eu=diam&est=nam&congue=tristique&elementum=tortor&in=eu"
            }
        ],
        "available_markets": "UY"
    }, {
        "album_type": "Rev",
        "artists": [
            {
                "external_urls": {
                    "spotify": "https://blogtalkradio.com/pede/ullamcorper/augue/a.jpg?nullam=ultrices&molestie=posuere&nibh=cubilia&in=curae&lectus=nulla&pellentesque=dapibus&at=dolor&nulla=vel&suspendisse=est&potenti=donec&cras=odio&in=justo&purus=sollicitudin&eu=ut&magna=suscipit&vulputate=a&luctus=feugiat&cum=et&sociis=eros&natoque=vestibulum&penatibus=ac&et=est&magnis=lacinia&dis=nisi&parturient=venenatis&montes=tristique&nascetur=fusce&ridiculus=congue"
                },
                "href": "http://angelfire.com/eros/suspendisse/accumsan.jsp?in=felis&libero=eu&ut=sapien&massa=cursus&volutpat=vestibulum&convallis=proin&morbi=eu&odio=mi&odio=nulla&elementum=ac&eu=enim&interdum=in&eu=tempor&tincidunt=turpis&in=nec&leo=euismod&maecenas=scelerisque&pulvinar=quam&lobortis=turpis&est=adipiscing&phasellus=lorem&sit=vitae&amet=mattis&erat=nibh&nulla=ligula&tempus=nec&vivamus=sem&in=duis&felis=aliquam&eu=convallis&sapien=nunc&cursus=proin&vestibulum=at&proin=turpis&eu=a&mi=pede&nulla=posuere&ac=nonummy&enim=integer&in=non&tempor=velit&turpis=donec&nec=diam&euismod=neque&scelerisque=vestibulum&quam=eget&turpis=vulputate&adipiscing=ut&lorem=ultrices&vitae=vel&mattis=augue&nibh=vestibulum&ligula=ante&nec=ipsum&sem=primis&duis=in&aliquam=faucibus&convallis=orci&nunc=luctus",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Dù",
                "type": "artist",
                "uri": "https://wiley.com/sapien/arcu/sed/augue.xml?ultrices=sit&enim=amet&lorem=consectetuer&ipsum=adipiscing&dolor=elit&sit=proin&amet=interdum&consectetuer=mauris&adipiscing=non&elit=ligula&proin=pellentesque&interdum=ultrices&mauris=phasellus&non=id&ligula=sapien&pellentesque=in&ultrices=sapien&phasellus=iaculis&id=congue&sapien=vivamus&in=metus&sapien=arcu&iaculis=adipiscing&congue=molestie&vivamus=hendrerit&metus=at&arcu=vulputate&adipiscing=vitae&molestie=nisl&hendrerit=aenean&at=lectus&vulputate=pellentesque&vitae=eget&nisl=nunc&aenean=donec&lectus=quis&pellentesque=orci&eget=eget&nunc=orci&donec=vehicula&quis=condimentum&orci=curabitur&eget=in&orci=libero&vehicula=ut&condimentum=massa&curabitur=volutpat"
            }
        ],
        "available_markets": "BT"
    }, {
        "album_type": "Rev",
        "artists": [
            {
                "external_urls": {
                    "spotify": "https://google.pl/eros.xml?fermentum=suspendisse&donec=potenti&ut=cras&mauris=in&eget=purus&massa=eu&tempor=magna&convallis=vulputate&nulla=luctus&neque=cum&libero=sociis&convallis=natoque&eget=penatibus&eleifend=et&luctus=magnis&ultricies=dis&eu=parturient&nibh=montes&quisque=nascetur&id=ridiculus&justo=mus&sit=vivamus&amet=vestibulum&sapien=sagittis&dignissim=sapien&vestibulum=cum&vestibulum=sociis&ante=natoque&ipsum=penatibus&primis=et&in=magnis&faucibus=dis&orci=parturient&luctus=montes&et=nascetur&ultrices=ridiculus&posuere=mus&cubilia=etiam&curae=vel&nulla=augue&dapibus=vestibulum&dolor=rutrum&vel=rutrum&est=neque&donec=aenean&odio=auctor&justo=gravida&sollicitudin=sem&ut=praesent&suscipit=id&a=massa"
                },
                "href": "https://ibm.com/praesent/id/massa/id.jsp?magna=ac&ac=neque&consequat=duis&metus=bibendum&sapien=morbi&ut=non&nunc=quam&vestibulum=nec&ante=dui&ipsum=luctus",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Marie-thérèse",
                "type": "artist",
                "uri": "https://squarespace.com/nulla/nunc/purus.json?justo=aenean&morbi=auctor&ut=gravida&odio=sem"
            }
        ],
        "available_markets": "OM"
    }, {
        "album_type": "Ms",
        "artists": [
            {
                "external_urls": {
                    "spotify": "http://shinystat.com/in/hac/habitasse.png?placerat=erat&ante=volutpat&nulla=in&justo=congue&aliquam=etiam&quis=justo&turpis=etiam&eget=pretium&elit=iaculis&sodales=justo&scelerisque=in&mauris=hac&sit=habitasse&amet=platea&eros=dictumst&suspendisse=etiam&accumsan=faucibus&tortor=cursus&quis=urna&turpis=ut&sed=tellus&ante=nulla&vivamus=ut&tortor=erat&duis=id&mattis=mauris&egestas=vulputate&metus=elementum&aenean=nullam&fermentum=varius&donec=nulla&ut=facilisi&mauris=cras&eget=non&massa=velit&tempor=nec&convallis=nisi&nulla=vulputate&neque=nonummy&libero=maecenas&convallis=tincidunt&eget=lacus&eleifend=at&luctus=velit&ultricies=vivamus&eu=vel&nibh=nulla&quisque=eget&id=eros&justo=elementum&sit=pellentesque&amet=quisque&sapien=porta&dignissim=volutpat&vestibulum=erat"
                },
                "href": "http://github.io/vivamus/in/felis/eu/sapien/cursus/vestibulum.jsp?primis=quisque&in=porta&faucibus=volutpat&orci=erat&luctus=quisque&et=erat&ultrices=eros&posuere=viverra&cubilia=eget&curae=congue&mauris=eget&viverra=semper&diam=rutrum&vitae=nulla&quam=nunc&suspendisse=purus&potenti=phasellus&nullam=in&porttitor=felis&lacus=donec&at=semper&turpis=sapien&donec=a&posuere=libero&metus=nam&vitae=dui&ipsum=proin&aliquam=leo&non=odio&mauris=porttitor&morbi=id&non=consequat&lectus=in&aliquam=consequat&sit=ut&amet=nulla&diam=sed&in=accumsan&magna=felis&bibendum=ut&imperdiet=at&nullam=dolor&orci=quis&pede=odio&venenatis=consequat&non=varius&sodales=integer&sed=ac&tincidunt=leo&eu=pellentesque&felis=ultrices&fusce=mattis&posuere=odio&felis=donec&sed=vitae&lacus=nisi&morbi=nam&sem=ultrices&mauris=libero&laoreet=non&ut=mattis&rhoncus=pulvinar&aliquet=nulla&pulvinar=pede&sed=ullamcorper&nisl=augue&nunc=a&rhoncus=suscipit&dui=nulla&vel=elit&sem=ac&sed=nulla&sagittis=sed&nam=vel",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Mélissandre",
                "type": "artist",
                "uri": "https://shop-pro.jp/dolor/sit/amet/consectetuer/adipiscing/elit.png?dignissim=eget&vestibulum=vulputate&vestibulum=ut&ante=ultrices&ipsum=vel&primis=augue&in=vestibulum&faucibus=ante&orci=ipsum&luctus=primis&et=in&ultrices=faucibus&posuere=orci&cubilia=luctus&curae=et&nulla=ultrices&dapibus=posuere&dolor=cubilia&vel=curae&est=donec&donec=pharetra&odio=magna&justo=vestibulum&sollicitudin=aliquet&ut=ultrices&suscipit=erat&a=tortor&feugiat=sollicitudin&et=mi&eros=sit&vestibulum=amet&ac=lobortis&est=sapien&lacinia=sapien&nisi=non&venenatis=mi&tristique=integer&fusce=ac&congue=neque&diam=duis&id=bibendum&ornare=morbi&imperdiet=non&sapien=quam&urna=nec&pretium=dui&nisl=luctus&ut=rutrum&volutpat=nulla&sapien=tellus&arcu=in&sed=sagittis&augue=dui&aliquam=vel&erat=nisl&volutpat=duis&in=ac&congue=nibh&etiam=fusce&justo=lacus&etiam=purus&pretium=aliquet&iaculis=at&justo=feugiat&in=non&hac=pretium&habitasse=quis&platea=lectus&dictumst=suspendisse&etiam=potenti&faucibus=in&cursus=eleifend&urna=quam&ut=a&tellus=odio&nulla=in&ut=hac&erat=habitasse&id=platea&mauris=dictumst&vulputate=maecenas&elementum=ut&nullam=massa&varius=quis"
            }
        ],
        "available_markets": "MY"
    }, {
        "album_type": "Ms",
        "artists": [
            {
                "external_urls": {
                    "spotify": "https://ocn.ne.jp/odio/donec/vitae/nisi/nam/ultrices.jsp?nulla=id&dapibus=pretium&dolor=iaculis&vel=diam&est=erat&donec=fermentum&odio=justo&justo=nec&sollicitudin=condimentum&ut=neque&suscipit=sapien&a=placerat&feugiat=ante&et=nulla&eros=justo&vestibulum=aliquam&ac=quis&est=turpis&lacinia=eget&nisi=elit&venenatis=sodales&tristique=scelerisque&fusce=mauris&congue=sit&diam=amet&id=eros"
                },
                "href": "https://loc.gov/feugiat.aspx?orci=elementum&vehicula=eu",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Ráo",
                "type": "artist",
                "uri": "https://google.com.au/in.js?sapien=hac&in=habitasse&sapien=platea&iaculis=dictumst&congue=aliquam&vivamus=augue&metus=quam&arcu=sollicitudin&adipiscing=vitae&molestie=consectetuer&hendrerit=eget&at=rutrum&vulputate=at&vitae=lorem&nisl=integer&aenean=tincidunt&lectus=ante&pellentesque=vel&eget=ipsum&nunc=praesent&donec=blandit&quis=lacinia&orci=erat&eget=vestibulum&orci=sed&vehicula=magna&condimentum=at&curabitur=nunc&in=commodo&libero=placerat&ut=praesent&massa=blandit&volutpat=nam&convallis=nulla&morbi=integer&odio=pede&odio=justo&elementum=lacinia&eu=eget&interdum=tincidunt&eu=eget&tincidunt=tempus&in=vel&leo=pede&maecenas=morbi&pulvinar=porttitor&lobortis=lorem&est=id&phasellus=ligula&sit=suspendisse&amet=ornare&erat=consequat&nulla=lectus&tempus=in&vivamus=est&in=risus&felis=auctor&eu=sed&sapien=tristique&cursus=in&vestibulum=tempus&proin=sit&eu=amet&mi=sem&nulla=fusce&ac=consequat&enim=nulla&in=nisl&tempor=nunc&turpis=nisl&nec=duis&euismod=bibendum&scelerisque=felis&quam=sed&turpis=interdum&adipiscing=venenatis&lorem=turpis&vitae=enim&mattis=blandit&nibh=mi"
            }
        ],
        "available_markets": "AM"
    }, {
        "album_type": "Honorable",
        "artists": [
            {
                "external_urls": {
                    "spotify": "http://berkeley.edu/in/hac/habitasse/platea/dictumst.js?ut=vivamus&massa=metus&volutpat=arcu&convallis=adipiscing&morbi=molestie&odio=hendrerit&odio=at&elementum=vulputate&eu=vitae&interdum=nisl&eu=aenean"
                },
                "href": "https://yolasite.com/ut/blandit/non/interdum/in/ante.html?tincidunt=sagittis&in=nam&leo=congue&maecenas=risus&pulvinar=semper&lobortis=porta&est=volutpat&phasellus=quam&sit=pede&amet=lobortis&erat=ligula&nulla=sit&tempus=amet&vivamus=eleifend&in=pede&felis=libero&eu=quis&sapien=orci&cursus=nullam",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Maïté",
                "type": "artist",
                "uri": "https://discovery.com/odio.aspx?magna=sed&at=justo&nunc=pellentesque&commodo=viverra&placerat=pede&praesent=ac&blandit=diam&nam=cras&nulla=pellentesque&integer=volutpat&pede=dui&justo=maecenas&lacinia=tristique&eget=est&tincidunt=et&eget=tempus&tempus=semper&vel=est&pede=quam&morbi=pharetra&porttitor=magna&lorem=ac&id=consequat&ligula=metus&suspendisse=sapien&ornare=ut&consequat=nunc&lectus=vestibulum&in=ante&est=ipsum&risus=primis&auctor=in&sed=faucibus&tristique=orci&in=luctus&tempus=et&sit=ultrices&amet=posuere&sem=cubilia&fusce=curae&consequat=mauris&nulla=viverra&nisl=diam&nunc=vitae&nisl=quam"
            }
        ],
        "available_markets": "HU"
    }, {
        "album_type": "Mrs",
        "artists": [
            {
                "external_urls": {
                    "spotify": "https://ning.com/sit/amet/turpis.jpg?varius=duis&nulla=bibendum&facilisi=felis&cras=sed&non=interdum&velit=venenatis&nec=turpis&nisi=enim&vulputate=blandit&nonummy=mi&maecenas=in&tincidunt=porttitor&lacus=pede&at=justo&velit=eu&vivamus=massa&vel=donec&nulla=dapibus&eget=duis&eros=at&elementum=velit&pellentesque=eu&quisque=est&porta=congue&volutpat=elementum&erat=in&quisque=hac&erat=habitasse&eros=platea&viverra=dictumst&eget=morbi&congue=vestibulum&eget=velit&semper=id&rutrum=pretium&nulla=iaculis&nunc=diam&purus=erat&phasellus=fermentum&in=justo&felis=nec&donec=condimentum&semper=neque&sapien=sapien&a=placerat&libero=ante&nam=nulla&dui=justo&proin=aliquam"
                },
                "href": "http://sun.com/lacus/morbi.xml?curabitur=amet&in=lobortis&libero=sapien&ut=sapien&massa=non&volutpat=mi&convallis=integer&morbi=ac&odio=neque&odio=duis&elementum=bibendum&eu=morbi&interdum=non&eu=quam&tincidunt=nec&in=dui&leo=luctus&maecenas=rutrum&pulvinar=nulla&lobortis=tellus&est=in&phasellus=sagittis&sit=dui&amet=vel&erat=nisl&nulla=duis&tempus=ac&vivamus=nibh&in=fusce&felis=lacus&eu=purus&sapien=aliquet&cursus=at&vestibulum=feugiat&proin=non&eu=pretium&mi=quis&nulla=lectus&ac=suspendisse&enim=potenti&in=in&tempor=eleifend&turpis=quam&nec=a&euismod=odio&scelerisque=in&quam=hac&turpis=habitasse&adipiscing=platea&lorem=dictumst&vitae=maecenas&mattis=ut&nibh=massa&ligula=quis&nec=augue",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Célestine",
                "type": "artist",
                "uri": "https://bizjournals.com/volutpat.jpg?diam=quam&neque=suspendisse&vestibulum=potenti&eget=nullam&vulputate=porttitor&ut=lacus&ultrices=at&vel=turpis&augue=donec&vestibulum=posuere&ante=metus&ipsum=vitae&primis=ipsum&in=aliquam&faucibus=non&orci=mauris&luctus=morbi&et=non&ultrices=lectus&posuere=aliquam&cubilia=sit&curae=amet&donec=diam&pharetra=in&magna=magna&vestibulum=bibendum&aliquet=imperdiet&ultrices=nullam&erat=orci&tortor=pede&sollicitudin=venenatis&mi=non&sit=sodales&amet=sed&lobortis=tincidunt&sapien=eu&sapien=felis&non=fusce&mi=posuere&integer=felis&ac=sed&neque=lacus&duis=morbi&bibendum=sem&morbi=mauris&non=laoreet&quam=ut&nec=rhoncus&dui=aliquet&luctus=pulvinar&rutrum=sed&nulla=nisl"
            }
        ],
        "available_markets": "TR"
    }, {
        "album_type": "Mrs",
        "artists": [
            {
                "external_urls": {
                    "spotify": "http://alibaba.com/consequat/morbi/a/ipsum/integer/a.jpg?amet=dui&eros=proin&suspendisse=leo&accumsan=odio&tortor=porttitor&quis=id&turpis=consequat&sed=in&ante=consequat&vivamus=ut&tortor=nulla&duis=sed&mattis=accumsan&egestas=felis&metus=ut"
                },
                "href": "https://buzzfeed.com/id/mauris.jpg?molestie=non&hendrerit=mattis&at=pulvinar&vulputate=nulla&vitae=pede&nisl=ullamcorper&aenean=augue&lectus=a&pellentesque=suscipit&eget=nulla&nunc=elit&donec=ac&quis=nulla&orci=sed&eget=vel&orci=enim&vehicula=sit&condimentum=amet&curabitur=nunc&in=viverra&libero=dapibus&ut=nulla&massa=suscipit&volutpat=ligula&convallis=in&morbi=lacus&odio=curabitur&odio=at&elementum=ipsum&eu=ac&interdum=tellus&eu=semper&tincidunt=interdum&in=mauris&leo=ullamcorper&maecenas=purus&pulvinar=sit&lobortis=amet&est=nulla&phasellus=quisque&sit=arcu&amet=libero&erat=rutrum&nulla=ac&tempus=lobortis&vivamus=vel&in=dapibus&felis=at&eu=diam&sapien=nam&cursus=tristique&vestibulum=tortor&proin=eu&eu=pede",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Salomé",
                "type": "artist",
                "uri": "https://taobao.com/lectus.jsp?commodo=volutpat&placerat=convallis&praesent=morbi&blandit=odio&nam=odio&nulla=elementum&integer=eu&pede=interdum&justo=eu&lacinia=tincidunt&eget=in&tincidunt=leo&eget=maecenas&tempus=pulvinar&vel=lobortis&pede=est&morbi=phasellus&porttitor=sit&lorem=amet&id=erat&ligula=nulla&suspendisse=tempus&ornare=vivamus&consequat=in&lectus=felis&in=eu&est=sapien&risus=cursus&auctor=vestibulum&sed=proin&tristique=eu&in=mi&tempus=nulla&sit=ac&amet=enim&sem=in&fusce=tempor&consequat=turpis&nulla=nec&nisl=euismod&nunc=scelerisque&nisl=quam&duis=turpis&bibendum=adipiscing&felis=lorem&sed=vitae&interdum=mattis&venenatis=nibh&turpis=ligula&enim=nec&blandit=sem&mi=duis&in=aliquam&porttitor=convallis&pede=nunc&justo=proin&eu=at&massa=turpis&donec=a&dapibus=pede&duis=posuere&at=nonummy&velit=integer&eu=non&est=velit&congue=donec&elementum=diam&in=neque&hac=vestibulum&habitasse=eget&platea=vulputate&dictumst=ut&morbi=ultrices&vestibulum=vel&velit=augue&id=vestibulum&pretium=ante&iaculis=ipsum"
            }
        ],
        "available_markets": "DE"
    }, {
        "album_type": "Mr",
        "artists": [
            {
                "external_urls": {
                    "spotify": "https://1und1.de/elit/proin/risus/praesent.aspx?augue=congue&luctus=etiam&tincidunt=justo&nulla=etiam&mollis=pretium&molestie=iaculis&lorem=justo&quisque=in&ut=hac&erat=habitasse&curabitur=platea&gravida=dictumst&nisi=etiam&at=faucibus&nibh=cursus&in=urna&hac=ut&habitasse=tellus&platea=nulla&dictumst=ut&aliquam=erat&augue=id&quam=mauris&sollicitudin=vulputate&vitae=elementum&consectetuer=nullam&eget=varius&rutrum=nulla&at=facilisi&lorem=cras&integer=non&tincidunt=velit&ante=nec&vel=nisi&ipsum=vulputate&praesent=nonummy&blandit=maecenas&lacinia=tincidunt&erat=lacus&vestibulum=at&sed=velit&magna=vivamus&at=vel&nunc=nulla&commodo=eget&placerat=eros&praesent=elementum&blandit=pellentesque&nam=quisque&nulla=porta&integer=volutpat&pede=erat&justo=quisque&lacinia=erat"
                },
                "href": "https://ocn.ne.jp/rutrum/rutrum/neque/aenean/auctor/gravida/sem.html?luctus=mauris&et=vulputate&ultrices=elementum&posuere=nullam&cubilia=varius&curae=nulla&duis=facilisi&faucibus=cras&accumsan=non&odio=velit&curabitur=nec&convallis=nisi&duis=vulputate&consequat=nonummy&dui=maecenas&nec=tincidunt&nisi=lacus&volutpat=at&eleifend=velit&donec=vivamus&ut=vel&dolor=nulla&morbi=eget&vel=eros&lectus=elementum&in=pellentesque&quam=quisque&fringilla=porta&rhoncus=volutpat&mauris=erat&enim=quisque&leo=erat&rhoncus=eros&sed=viverra&vestibulum=eget&sit=congue&amet=eget&cursus=semper&id=rutrum&turpis=nulla&integer=nunc&aliquet=purus&massa=phasellus&id=in&lobortis=felis&convallis=donec&tortor=semper&risus=sapien&dapibus=a&augue=libero&vel=nam&accumsan=dui&tellus=proin&nisi=leo&eu=odio&orci=porttitor&mauris=id&lacinia=consequat&sapien=in&quis=consequat&libero=ut&nullam=nulla&sit=sed&amet=accumsan&turpis=felis&elementum=ut&ligula=at&vehicula=dolor&consequat=quis&morbi=odio&a=consequat&ipsum=varius&integer=integer&a=ac&nibh=leo&in=pellentesque&quis=ultrices&justo=mattis&maecenas=odio&rhoncus=donec&aliquam=vitae&lacus=nisi&morbi=nam&quis=ultrices",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Yú",
                "type": "artist",
                "uri": "http://clickbank.net/eros/viverra.jsp?lorem=neque&ipsum=libero&dolor=convallis&sit=eget&amet=eleifend&consectetuer=luctus&adipiscing=ultricies&elit=eu&proin=nibh&risus=quisque&praesent=id&lectus=justo&vestibulum=sit&quam=amet&sapien=sapien&varius=dignissim&ut=vestibulum&blandit=vestibulum&non=ante&interdum=ipsum&in=primis&ante=in&vestibulum=faucibus&ante=orci&ipsum=luctus&primis=et&in=ultrices&faucibus=posuere&orci=cubilia&luctus=curae&et=nulla&ultrices=dapibus&posuere=dolor&cubilia=vel&curae=est&duis=donec&faucibus=odio&accumsan=justo&odio=sollicitudin&curabitur=ut&convallis=suscipit&duis=a&consequat=feugiat&dui=et&nec=eros&nisi=vestibulum&volutpat=ac&eleifend=est&donec=lacinia&ut=nisi&dolor=venenatis&morbi=tristique&vel=fusce&lectus=congue&in=diam&quam=id&fringilla=ornare&rhoncus=imperdiet&mauris=sapien&enim=urna&leo=pretium&rhoncus=nisl&sed=ut&vestibulum=volutpat&sit=sapien&amet=arcu&cursus=sed&id=augue&turpis=aliquam&integer=erat&aliquet=volutpat&massa=in&id=congue&lobortis=etiam&convallis=justo&tortor=etiam"
            }
        ],
        "available_markets": "ME"
    }, {
        "album_type": "Rev",
        "artists": [
            {
                "external_urls": {
                    "spotify": "http://bloglovin.com/eu/magna/vulputate.json?fusce=in&congue=congue&diam=etiam&id=justo&ornare=etiam&imperdiet=pretium&sapien=iaculis&urna=justo&pretium=in&nisl=hac&ut=habitasse&volutpat=platea&sapien=dictumst&arcu=etiam&sed=faucibus&augue=cursus&aliquam=urna&erat=ut&volutpat=tellus&in=nulla&congue=ut&etiam=erat&justo=id&etiam=mauris&pretium=vulputate&iaculis=elementum&justo=nullam&in=varius&hac=nulla&habitasse=facilisi&platea=cras&dictumst=non&etiam=velit&faucibus=nec&cursus=nisi&urna=vulputate&ut=nonummy&tellus=maecenas&nulla=tincidunt&ut=lacus&erat=at&id=velit&mauris=vivamus&vulputate=vel&elementum=nulla&nullam=eget&varius=eros&nulla=elementum&facilisi=pellentesque&cras=quisque&non=porta&velit=volutpat&nec=erat&nisi=quisque&vulputate=erat&nonummy=eros&maecenas=viverra&tincidunt=eget&lacus=congue&at=eget&velit=semper&vivamus=rutrum&vel=nulla&nulla=nunc&eget=purus&eros=phasellus"
                },
                "href": "https://theguardian.com/vestibulum/aliquet/ultrices/erat/tortor.jpg?in=nulla",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Bérénice",
                "type": "artist",
                "uri": "https://amazonaws.com/vulputate/vitae/nisl.js?in=convallis&purus=duis&eu=consequat&magna=dui&vulputate=nec&luctus=nisi&cum=volutpat&sociis=eleifend&natoque=donec"
            }
        ],
        "available_markets": "IT"
    }, {
        "album_type": "Mrs",
        "artists": [
            {
                "external_urls": {
                    "spotify": "https://wsj.com/pellentesque.xml?dapibus=phasellus&duis=in&at=felis&velit=donec&eu=semper&est=sapien&congue=a&elementum=libero&in=nam&hac=dui&habitasse=proin&platea=leo&dictumst=odio&morbi=porttitor&vestibulum=id&velit=consequat&id=in&pretium=consequat&iaculis=ut&diam=nulla&erat=sed&fermentum=accumsan&justo=felis&nec=ut&condimentum=at&neque=dolor&sapien=quis&placerat=odio&ante=consequat&nulla=varius&justo=integer&aliquam=ac&quis=leo&turpis=pellentesque&eget=ultrices&elit=mattis&sodales=odio&scelerisque=donec&mauris=vitae&sit=nisi&amet=nam&eros=ultrices&suspendisse=libero&accumsan=non&tortor=mattis&quis=pulvinar&turpis=nulla&sed=pede&ante=ullamcorper&vivamus=augue&tortor=a&duis=suscipit&mattis=nulla&egestas=elit&metus=ac&aenean=nulla&fermentum=sed&donec=vel&ut=enim&mauris=sit&eget=amet&massa=nunc&tempor=viverra&convallis=dapibus&nulla=nulla&neque=suscipit&libero=ligula&convallis=in&eget=lacus&eleifend=curabitur&luctus=at&ultricies=ipsum&eu=ac&nibh=tellus&quisque=semper&id=interdum&justo=mauris&sit=ullamcorper&amet=purus&sapien=sit&dignissim=amet&vestibulum=nulla&vestibulum=quisque&ante=arcu&ipsum=libero&primis=rutrum&in=ac&faucibus=lobortis&orci=vel"
                },
                "href": "https://cmu.edu/mauris.png?non=morbi&velit=odio&donec=odio&diam=elementum&neque=eu&vestibulum=interdum&eget=eu&vulputate=tincidunt&ut=in&ultrices=leo&vel=maecenas&augue=pulvinar&vestibulum=lobortis&ante=est&ipsum=phasellus&primis=sit&in=amet&faucibus=erat&orci=nulla&luctus=tempus&et=vivamus&ultrices=in&posuere=felis&cubilia=eu&curae=sapien&donec=cursus&pharetra=vestibulum&magna=proin&vestibulum=eu&aliquet=mi&ultrices=nulla&erat=ac",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Aloïs",
                "type": "artist",
                "uri": "https://usgs.gov/nam/congue/risus/semper/porta/volutpat.jsp?urna=posuere&ut=cubilia&tellus=curae&nulla=donec&ut=pharetra&erat=magna&id=vestibulum&mauris=aliquet&vulputate=ultrices&elementum=erat&nullam=tortor&varius=sollicitudin&nulla=mi&facilisi=sit&cras=amet&non=lobortis&velit=sapien&nec=sapien&nisi=non&vulputate=mi&nonummy=integer&maecenas=ac&tincidunt=neque"
            }
        ],
        "available_markets": "SI"
    }, {
        "album_type": "Dr",
        "artists": [
            {
                "external_urls": {
                    "spotify": "http://noaa.gov/donec.jsp?eget=luctus&massa=rutrum&tempor=nulla&convallis=tellus&nulla=in&neque=sagittis&libero=dui&convallis=vel&eget=nisl&eleifend=duis&luctus=ac&ultricies=nibh&eu=fusce&nibh=lacus&quisque=purus&id=aliquet"
                },
                "href": "https://ucsd.edu/nisi/venenatis.js?lectus=tristique&vestibulum=fusce&quam=congue&sapien=diam&varius=id&ut=ornare&blandit=imperdiet&non=sapien&interdum=urna&in=pretium&ante=nisl&vestibulum=ut&ante=volutpat&ipsum=sapien&primis=arcu&in=sed&faucibus=augue&orci=aliquam&luctus=erat&et=volutpat&ultrices=in&posuere=congue&cubilia=etiam&curae=justo&duis=etiam&faucibus=pretium&accumsan=iaculis&odio=justo",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Régine",
                "type": "artist",
                "uri": "http://etsy.com/interdum/mauris/non/ligula/pellentesque/ultrices/phasellus.aspx?justo=nisi&in=volutpat&hac=eleifend&habitasse=donec&platea=ut&dictumst=dolor&etiam=morbi&faucibus=vel&cursus=lectus&urna=in&ut=quam&tellus=fringilla&nulla=rhoncus&ut=mauris&erat=enim&id=leo&mauris=rhoncus&vulputate=sed&elementum=vestibulum&nullam=sit&varius=amet&nulla=cursus&facilisi=id&cras=turpis&non=integer&velit=aliquet&nec=massa&nisi=id&vulputate=lobortis&nonummy=convallis&maecenas=tortor&tincidunt=risus&lacus=dapibus&at=augue&velit=vel&vivamus=accumsan&vel=tellus&nulla=nisi&eget=eu&eros=orci&elementum=mauris&pellentesque=lacinia&quisque=sapien&porta=quis&volutpat=libero&erat=nullam&quisque=sit&erat=amet&eros=turpis&viverra=elementum&eget=ligula&congue=vehicula&eget=consequat&semper=morbi&rutrum=a&nulla=ipsum&nunc=integer&purus=a&phasellus=nibh&in=in&felis=quis&donec=justo&semper=maecenas&sapien=rhoncus&a=aliquam&libero=lacus&nam=morbi&dui=quis&proin=tortor&leo=id&odio=nulla&porttitor=ultrices&id=aliquet&consequat=maecenas&in=leo&consequat=odio&ut=condimentum&nulla=id&sed=luctus&accumsan=nec&felis=molestie&ut=sed&at=justo&dolor=pellentesque&quis=viverra&odio=pede&consequat=ac&varius=diam&integer=cras&ac=pellentesque&leo=volutpat&pellentesque=dui&ultrices=maecenas&mattis=tristique"
            }
        ],
        "available_markets": "MK"
    }, {
        "album_type": "Mr",
        "artists": [
            {
                "external_urls": {
                    "spotify": "http://bloglines.com/at/velit/vivamus/vel/nulla/eget/eros.xml?euismod=hac&scelerisque=habitasse&quam=platea&turpis=dictumst&adipiscing=maecenas&lorem=ut&vitae=massa&mattis=quis&nibh=augue&ligula=luctus&nec=tincidunt&sem=nulla&duis=mollis&aliquam=molestie&convallis=lorem&nunc=quisque&proin=ut&at=erat&turpis=curabitur&a=gravida&pede=nisi&posuere=at&nonummy=nibh&integer=in&non=hac&velit=habitasse&donec=platea&diam=dictumst&neque=aliquam&vestibulum=augue&eget=quam&vulputate=sollicitudin&ut=vitae&ultrices=consectetuer&vel=eget&augue=rutrum&vestibulum=at&ante=lorem&ipsum=integer&primis=tincidunt&in=ante&faucibus=vel&orci=ipsum&luctus=praesent&et=blandit&ultrices=lacinia&posuere=erat&cubilia=vestibulum&curae=sed&donec=magna&pharetra=at&magna=nunc&vestibulum=commodo&aliquet=placerat&ultrices=praesent&erat=blandit&tortor=nam&sollicitudin=nulla&mi=integer&sit=pede"
                },
                "href": "http://wix.com/faucibus/orci/luctus.html?quam=eget&sapien=nunc&varius=donec&ut=quis&blandit=orci&non=eget&interdum=orci&in=vehicula&ante=condimentum&vestibulum=curabitur&ante=in&ipsum=libero&primis=ut&in=massa&faucibus=volutpat&orci=convallis&luctus=morbi&et=odio&ultrices=odio&posuere=elementum&cubilia=eu&curae=interdum&duis=eu&faucibus=tincidunt&accumsan=in&odio=leo&curabitur=maecenas&convallis=pulvinar&duis=lobortis&consequat=est&dui=phasellus&nec=sit&nisi=amet&volutpat=erat",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Yáo",
                "type": "artist",
                "uri": "https://reference.com/faucibus/accumsan/odio.png?tincidunt=eget&eu=rutrum&felis=at&fusce=lorem&posuere=integer&felis=tincidunt&sed=ante&lacus=vel&morbi=ipsum&sem=praesent&mauris=blandit&laoreet=lacinia&ut=erat&rhoncus=vestibulum&aliquet=sed&pulvinar=magna&sed=at&nisl=nunc&nunc=commodo&rhoncus=placerat&dui=praesent&vel=blandit&sem=nam&sed=nulla&sagittis=integer&nam=pede&congue=justo&risus=lacinia&semper=eget&porta=tincidunt&volutpat=eget&quam=tempus&pede=vel&lobortis=pede&ligula=morbi&sit=porttitor"
            }
        ],
        "available_markets": "EG"
    }, {
        "album_type": "Dr",
        "artists": [
            {
                "external_urls": {
                    "spotify": "http://mapquest.com/potenti/nullam/porttitor.png?ante=odio&ipsum=in&primis=hac&in=habitasse&faucibus=platea&orci=dictumst"
                },
                "href": "http://lulu.com/nullam/molestie/nibh/in.jpg?condimentum=montes&neque=nascetur&sapien=ridiculus&placerat=mus&ante=vivamus&nulla=vestibulum&justo=sagittis&aliquam=sapien&quis=cum&turpis=sociis&eget=natoque&elit=penatibus&sodales=et&scelerisque=magnis&mauris=dis&sit=parturient&amet=montes&eros=nascetur&suspendisse=ridiculus&accumsan=mus&tortor=etiam&quis=vel&turpis=augue&sed=vestibulum&ante=rutrum&vivamus=rutrum&tortor=neque&duis=aenean&mattis=auctor&egestas=gravida&metus=sem&aenean=praesent&fermentum=id&donec=massa&ut=id&mauris=nisl&eget=venenatis&massa=lacinia&tempor=aenean&convallis=sit&nulla=amet&neque=justo&libero=morbi&convallis=ut&eget=odio&eleifend=cras&luctus=mi&ultricies=pede&eu=malesuada&nibh=in&quisque=imperdiet&id=et&justo=commodo&sit=vulputate&amet=justo&sapien=in&dignissim=blandit&vestibulum=ultrices&vestibulum=enim&ante=lorem&ipsum=ipsum&primis=dolor&in=sit&faucibus=amet&orci=consectetuer&luctus=adipiscing&et=elit&ultrices=proin&posuere=interdum&cubilia=mauris&curae=non",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Méline",
                "type": "artist",
                "uri": "http://youtu.be/vestibulum/velit/id/pretium.html?in=rhoncus&quam=sed&fringilla=vestibulum&rhoncus=sit&mauris=amet&enim=cursus&leo=id&rhoncus=turpis&sed=integer&vestibulum=aliquet&sit=massa&amet=id&cursus=lobortis&id=convallis&turpis=tortor&integer=risus&aliquet=dapibus&massa=augue&id=vel&lobortis=accumsan&convallis=tellus&tortor=nisi&risus=eu&dapibus=orci&augue=mauris&vel=lacinia&accumsan=sapien&tellus=quis&nisi=libero&eu=nullam"
            }
        ],
        "available_markets": "GT"
    }, {
        "album_type": "Mr",
        "artists": [
            {
                "external_urls": {
                    "spotify": "https://jiathis.com/duis/bibendum.html?sollicitudin=in&mi=porttitor"
                },
                "href": "http://baidu.com/diam/in/magna.jpg?maecenas=in&ut=faucibus&massa=orci&quis=luctus&augue=et&luctus=ultrices&tincidunt=posuere&nulla=cubilia&mollis=curae&molestie=mauris&lorem=viverra&quisque=diam&ut=vitae&erat=quam&curabitur=suspendisse&gravida=potenti&nisi=nullam&at=porttitor&nibh=lacus&in=at&hac=turpis&habitasse=donec&platea=posuere&dictumst=metus&aliquam=vitae&augue=ipsum&quam=aliquam&sollicitudin=non&vitae=mauris&consectetuer=morbi&eget=non&rutrum=lectus&at=aliquam&lorem=sit&integer=amet",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Anaïs",
                "type": "artist",
                "uri": "http://plala.or.jp/mauris/lacinia/sapien/quis/libero.jsp?eros=porttitor&elementum=pede&pellentesque=justo&quisque=eu&porta=massa&volutpat=donec&erat=dapibus&quisque=duis&erat=at&eros=velit&viverra=eu&eget=est&congue=congue&eget=elementum&semper=in&rutrum=hac&nulla=habitasse&nunc=platea"
            }
        ],
        "available_markets": "EG"
    }, {
        "album_type": "Mr",
        "artists": [
            {
                "external_urls": {
                    "spotify": "https://goodreads.com/in.jpg?porttitor=mattis&lorem=nibh&id=ligula&ligula=nec&suspendisse=sem&ornare=duis&consequat=aliquam&lectus=convallis&in=nunc&est=proin&risus=at&auctor=turpis&sed=a&tristique=pede&in=posuere&tempus=nonummy&sit=integer&amet=non&sem=velit"
                },
                "href": "https://qq.com/ante/vivamus/tortor/duis/mattis/egestas/metus.json?odio=dui&condimentum=proin&id=leo&luctus=odio&nec=porttitor&molestie=id&sed=consequat&justo=in&pellentesque=consequat&viverra=ut&pede=nulla&ac=sed&diam=accumsan&cras=felis&pellentesque=ut&volutpat=at&dui=dolor&maecenas=quis&tristique=odio",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Fèi",
                "type": "artist",
                "uri": "http://de.vu/ac/consequat.xml?amet=massa&cursus=id&id=lobortis&turpis=convallis&integer=tortor&aliquet=risus&massa=dapibus&id=augue&lobortis=vel&convallis=accumsan&tortor=tellus&risus=nisi&dapibus=eu&augue=orci&vel=mauris&accumsan=lacinia&tellus=sapien&nisi=quis&eu=libero&orci=nullam&mauris=sit&lacinia=amet&sapien=turpis&quis=elementum&libero=ligula&nullam=vehicula&sit=consequat&amet=morbi&turpis=a&elementum=ipsum&ligula=integer&vehicula=a&consequat=nibh&morbi=in&a=quis&ipsum=justo&integer=maecenas&a=rhoncus&nibh=aliquam&in=lacus&quis=morbi&justo=quis&maecenas=tortor&rhoncus=id&aliquam=nulla&lacus=ultrices&morbi=aliquet&quis=maecenas&tortor=leo&id=odio&nulla=condimentum&ultrices=id&aliquet=luctus&maecenas=nec&leo=molestie&odio=sed&condimentum=justo&id=pellentesque&luctus=viverra&nec=pede&molestie=ac&sed=diam&justo=cras&pellentesque=pellentesque"
            }
        ],
        "available_markets": "IL"
    }, {
        "album_type": "Rev",
        "artists": [
            {
                "external_urls": {
                    "spotify": "http://opensource.org/sed/sagittis/nam/congue.xml?praesent=mattis&lectus=odio&vestibulum=donec&quam=vitae&sapien=nisi&varius=nam&ut=ultrices&blandit=libero&non=non&interdum=mattis&in=pulvinar&ante=nulla&vestibulum=pede&ante=ullamcorper&ipsum=augue&primis=a&in=suscipit&faucibus=nulla&orci=elit&luctus=ac&et=nulla&ultrices=sed&posuere=vel&cubilia=enim&curae=sit&duis=amet&faucibus=nunc&accumsan=viverra&odio=dapibus&curabitur=nulla&convallis=suscipit&duis=ligula&consequat=in&dui=lacus&nec=curabitur&nisi=at&volutpat=ipsum&eleifend=ac&donec=tellus&ut=semper&dolor=interdum&morbi=mauris&vel=ullamcorper&lectus=purus&in=sit&quam=amet&fringilla=nulla&rhoncus=quisque&mauris=arcu&enim=libero&leo=rutrum&rhoncus=ac&sed=lobortis&vestibulum=vel&sit=dapibus&amet=at"
                },
                "href": "https://goo.ne.jp/velit/donec/diam.xml?pharetra=sociis&magna=natoque&ac=penatibus&consequat=et&metus=magnis&sapien=dis&ut=parturient&nunc=montes&vestibulum=nascetur&ante=ridiculus&ipsum=mus&primis=vivamus&in=vestibulum&faucibus=sagittis&orci=sapien&luctus=cum&et=sociis&ultrices=natoque&posuere=penatibus&cubilia=et&curae=magnis&mauris=dis&viverra=parturient&diam=montes&vitae=nascetur&quam=ridiculus&suspendisse=mus&potenti=etiam&nullam=vel&porttitor=augue&lacus=vestibulum&at=rutrum&turpis=rutrum&donec=neque&posuere=aenean&metus=auctor&vitae=gravida&ipsum=sem&aliquam=praesent&non=id&mauris=massa&morbi=id&non=nisl&lectus=venenatis&aliquam=lacinia&sit=aenean",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Adélaïde",
                "type": "artist",
                "uri": "https://jiathis.com/at/ipsum.json?orci=justo&mauris=aliquam&lacinia=quis&sapien=turpis&quis=eget&libero=elit&nullam=sodales&sit=scelerisque&amet=mauris&turpis=sit&elementum=amet&ligula=eros&vehicula=suspendisse&consequat=accumsan&morbi=tortor&a=quis&ipsum=turpis&integer=sed&a=ante&nibh=vivamus&in=tortor&quis=duis&justo=mattis&maecenas=egestas&rhoncus=metus&aliquam=aenean&lacus=fermentum&morbi=donec&quis=ut&tortor=mauris"
            }
        ],
        "available_markets": "CR"
    }, {
        "album_type": "Honorable",
        "artists": [
            {
                "external_urls": {
                    "spotify": "https://phoca.cz/maecenas/pulvinar/lobortis/est/phasellus.png?sapien=fusce&iaculis=consequat&congue=nulla&vivamus=nisl&metus=nunc&arcu=nisl&adipiscing=duis&molestie=bibendum&hendrerit=felis&at=sed&vulputate=interdum&vitae=venenatis&nisl=turpis&aenean=enim&lectus=blandit&pellentesque=mi&eget=in&nunc=porttitor&donec=pede&quis=justo&orci=eu&eget=massa&orci=donec&vehicula=dapibus&condimentum=duis&curabitur=at&in=velit&libero=eu&ut=est&massa=congue&volutpat=elementum&convallis=in&morbi=hac&odio=habitasse&odio=platea&elementum=dictumst&eu=morbi&interdum=vestibulum&eu=velit&tincidunt=id&in=pretium&leo=iaculis&maecenas=diam&pulvinar=erat&lobortis=fermentum&est=justo&phasellus=nec&sit=condimentum&amet=neque&erat=sapien&nulla=placerat&tempus=ante&vivamus=nulla&in=justo&felis=aliquam&eu=quis&sapien=turpis&cursus=eget&vestibulum=elit&proin=sodales&eu=scelerisque&mi=mauris&nulla=sit&ac=amet&enim=eros&in=suspendisse&tempor=accumsan&turpis=tortor&nec=quis&euismod=turpis&scelerisque=sed&quam=ante&turpis=vivamus&adipiscing=tortor&lorem=duis&vitae=mattis&mattis=egestas&nibh=metus&ligula=aenean&nec=fermentum&sem=donec&duis=ut&aliquam=mauris&convallis=eget&nunc=massa&proin=tempor&at=convallis&turpis=nulla&a=neque&pede=libero&posuere=convallis&nonummy=eget&integer=eleifend&non=luctus&velit=ultricies&donec=eu&diam=nibh"
                },
                "href": "http://cafepress.com/mattis/pulvinar/nulla/pede/ullamcorper.jpg?libero=justo&nam=sit&dui=amet&proin=sapien&leo=dignissim&odio=vestibulum&porttitor=vestibulum&id=ante&consequat=ipsum&in=primis&consequat=in&ut=faucibus&nulla=orci&sed=luctus&accumsan=et&felis=ultrices&ut=posuere&at=cubilia&dolor=curae&quis=nulla&odio=dapibus&consequat=dolor&varius=vel&integer=est&ac=donec&leo=odio&pellentesque=justo&ultrices=sollicitudin&mattis=ut&odio=suscipit&donec=a&vitae=feugiat&nisi=et&nam=eros&ultrices=vestibulum&libero=ac&non=est&mattis=lacinia&pulvinar=nisi&nulla=venenatis&pede=tristique&ullamcorper=fusce&augue=congue&a=diam&suscipit=id&nulla=ornare&elit=imperdiet&ac=sapien&nulla=urna&sed=pretium&vel=nisl&enim=ut&sit=volutpat&amet=sapien&nunc=arcu&viverra=sed&dapibus=augue&nulla=aliquam&suscipit=erat",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Anaëlle",
                "type": "artist",
                "uri": "http://arizona.edu/ut/nulla/sed/accumsan/felis/ut.html?suscipit=nisi&a=venenatis&feugiat=tristique&et=fusce&eros=congue&vestibulum=diam&ac=id&est=ornare&lacinia=imperdiet&nisi=sapien&venenatis=urna&tristique=pretium&fusce=nisl&congue=ut&diam=volutpat&id=sapien&ornare=arcu&imperdiet=sed&sapien=augue&urna=aliquam&pretium=erat&nisl=volutpat&ut=in"
            }
        ],
        "available_markets": "UY"
    }, {
        "album_type": "Mr",
        "artists": [
            {
                "external_urls": {
                    "spotify": "https://tripadvisor.com/mauris/morbi/non.jpg?vestibulum=turpis&rutrum=elementum&rutrum=ligula&neque=vehicula&aenean=consequat&auctor=morbi&gravida=a&sem=ipsum&praesent=integer&id=a&massa=nibh&id=in&nisl=quis&venenatis=justo&lacinia=maecenas&aenean=rhoncus&sit=aliquam&amet=lacus&justo=morbi&morbi=quis&ut=tortor&odio=id&cras=nulla&mi=ultrices&pede=aliquet&malesuada=maecenas&in=leo&imperdiet=odio&et=condimentum&commodo=id&vulputate=luctus&justo=nec&in=molestie&blandit=sed&ultrices=justo&enim=pellentesque&lorem=viverra&ipsum=pede&dolor=ac&sit=diam&amet=cras&consectetuer=pellentesque&adipiscing=volutpat&elit=dui&proin=maecenas&interdum=tristique&mauris=est&non=et&ligula=tempus&pellentesque=semper&ultrices=est&phasellus=quam&id=pharetra&sapien=magna&in=ac&sapien=consequat&iaculis=metus&congue=sapien&vivamus=ut&metus=nunc&arcu=vestibulum&adipiscing=ante&molestie=ipsum&hendrerit=primis&at=in&vulputate=faucibus&vitae=orci&nisl=luctus&aenean=et&lectus=ultrices&pellentesque=posuere&eget=cubilia&nunc=curae&donec=mauris&quis=viverra&orci=diam&eget=vitae&orci=quam&vehicula=suspendisse&condimentum=potenti&curabitur=nullam&in=porttitor&libero=lacus&ut=at"
                },
                "href": "https://who.int/amet/lobortis/sapien/sapien.png?adipiscing=sit&molestie=amet&hendrerit=diam&at=in&vulputate=magna&vitae=bibendum&nisl=imperdiet&aenean=nullam&lectus=orci&pellentesque=pede&eget=venenatis&nunc=non&donec=sodales&quis=sed&orci=tincidunt&eget=eu&orci=felis&vehicula=fusce&condimentum=posuere&curabitur=felis&in=sed&libero=lacus&ut=morbi&massa=sem&volutpat=mauris&convallis=laoreet&morbi=ut&odio=rhoncus&odio=aliquet&elementum=pulvinar&eu=sed&interdum=nisl&eu=nunc&tincidunt=rhoncus&in=dui&leo=vel&maecenas=sem&pulvinar=sed&lobortis=sagittis&est=nam&phasellus=congue&sit=risus&amet=semper&erat=porta&nulla=volutpat&tempus=quam&vivamus=pede&in=lobortis&felis=ligula&eu=sit&sapien=amet&cursus=eleifend&vestibulum=pede&proin=libero&eu=quis&mi=orci&nulla=nullam",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Nélie",
                "type": "artist",
                "uri": "https://weather.com/sit.png?integer=in&ac=congue&leo=etiam&pellentesque=justo&ultrices=etiam&mattis=pretium&odio=iaculis&donec=justo&vitae=in&nisi=hac&nam=habitasse&ultrices=platea&libero=dictumst&non=etiam&mattis=faucibus&pulvinar=cursus&nulla=urna&pede=ut&ullamcorper=tellus&augue=nulla&a=ut&suscipit=erat&nulla=id&elit=mauris&ac=vulputate&nulla=elementum&sed=nullam&vel=varius&enim=nulla&sit=facilisi&amet=cras&nunc=non&viverra=velit&dapibus=nec&nulla=nisi&suscipit=vulputate&ligula=nonummy&in=maecenas&lacus=tincidunt&curabitur=lacus&at=at&ipsum=velit&ac=vivamus&tellus=vel&semper=nulla&interdum=eget"
            }
        ],
        "available_markets": "BO"
    }, {
        "album_type": "Dr",
        "artists": [
            {
                "external_urls": {
                    "spotify": "http://ow.ly/nulla/eget/eros/elementum/pellentesque.html?in=lectus&hac=aliquam&habitasse=sit&platea=amet&dictumst=diam&maecenas=in&ut=magna&massa=bibendum&quis=imperdiet&augue=nullam&luctus=orci&tincidunt=pede&nulla=venenatis&mollis=non&molestie=sodales&lorem=sed&quisque=tincidunt&ut=eu"
                },
                "href": "https://hhs.gov/mattis/nibh/ligula/nec.jsp?non=pretium&velit=nisl&nec=ut&nisi=volutpat&vulputate=sapien&nonummy=arcu&maecenas=sed&tincidunt=augue&lacus=aliquam&at=erat&velit=volutpat&vivamus=in&vel=congue&nulla=etiam&eget=justo&eros=etiam&elementum=pretium&pellentesque=iaculis&quisque=justo&porta=in&volutpat=hac&erat=habitasse&quisque=platea&erat=dictumst&eros=etiam&viverra=faucibus&eget=cursus&congue=urna&eget=ut&semper=tellus&rutrum=nulla&nulla=ut&nunc=erat&purus=id&phasellus=mauris&in=vulputate&felis=elementum&donec=nullam&semper=varius&sapien=nulla&a=facilisi&libero=cras&nam=non&dui=velit&proin=nec&leo=nisi&odio=vulputate&porttitor=nonummy&id=maecenas&consequat=tincidunt&in=lacus&consequat=at&ut=velit&nulla=vivamus&sed=vel&accumsan=nulla&felis=eget&ut=eros&at=elementum&dolor=pellentesque&quis=quisque&odio=porta&consequat=volutpat&varius=erat&integer=quisque&ac=erat&leo=eros&pellentesque=viverra&ultrices=eget&mattis=congue&odio=eget&donec=semper&vitae=rutrum&nisi=nulla&nam=nunc&ultrices=purus&libero=phasellus&non=in&mattis=felis&pulvinar=donec&nulla=semper&pede=sapien&ullamcorper=a&augue=libero&a=nam&suscipit=dui&nulla=proin&elit=leo",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Adèle",
                "type": "artist",
                "uri": "https://theguardian.com/libero/non/mattis/pulvinar/nulla/pede.html?tempor=eget&convallis=elit&nulla=sodales&neque=scelerisque&libero=mauris&convallis=sit&eget=amet&eleifend=eros&luctus=suspendisse&ultricies=accumsan&eu=tortor&nibh=quis&quisque=turpis&id=sed&justo=ante&sit=vivamus&amet=tortor&sapien=duis&dignissim=mattis&vestibulum=egestas&vestibulum=metus&ante=aenean&ipsum=fermentum&primis=donec&in=ut&faucibus=mauris&orci=eget&luctus=massa&et=tempor&ultrices=convallis&posuere=nulla&cubilia=neque&curae=libero&nulla=convallis&dapibus=eget&dolor=eleifend&vel=luctus&est=ultricies&donec=eu&odio=nibh&justo=quisque&sollicitudin=id&ut=justo&suscipit=sit&a=amet&feugiat=sapien&et=dignissim&eros=vestibulum&vestibulum=vestibulum&ac=ante&est=ipsum&lacinia=primis&nisi=in&venenatis=faucibus&tristique=orci&fusce=luctus&congue=et&diam=ultrices&id=posuere&ornare=cubilia&imperdiet=curae&sapien=nulla&urna=dapibus"
            }
        ],
        "available_markets": "SV"
    }, {
        "album_type": "Ms",
        "artists": [
            {
                "external_urls": {
                    "spotify": "https://so-net.ne.jp/orci/eget/orci/vehicula/condimentum/curabitur.jsp?quis=aliquet&justo=at&maecenas=feugiat&rhoncus=non&aliquam=pretium&lacus=quis&morbi=lectus&quis=suspendisse&tortor=potenti&id=in&nulla=eleifend&ultrices=quam&aliquet=a&maecenas=odio&leo=in&odio=hac&condimentum=habitasse&id=platea&luctus=dictumst&nec=maecenas&molestie=ut&sed=massa&justo=quis&pellentesque=augue&viverra=luctus&pede=tincidunt&ac=nulla&diam=mollis&cras=molestie&pellentesque=lorem&volutpat=quisque&dui=ut&maecenas=erat&tristique=curabitur&est=gravida&et=nisi&tempus=at&semper=nibh&est=in&quam=hac&pharetra=habitasse&magna=platea"
                },
                "href": "https://photobucket.com/quam/turpis/adipiscing/lorem/vitae/mattis.xml?orci=nisi&luctus=at&et=nibh&ultrices=in&posuere=hac&cubilia=habitasse&curae=platea&mauris=dictumst&viverra=aliquam&diam=augue&vitae=quam&quam=sollicitudin&suspendisse=vitae&potenti=consectetuer&nullam=eget&porttitor=rutrum&lacus=at&at=lorem&turpis=integer&donec=tincidunt&posuere=ante&metus=vel&vitae=ipsum&ipsum=praesent&aliquam=blandit&non=lacinia&mauris=erat&morbi=vestibulum&non=sed&lectus=magna&aliquam=at&sit=nunc&amet=commodo&diam=placerat&in=praesent&magna=blandit&bibendum=nam&imperdiet=nulla&nullam=integer&orci=pede&pede=justo&venenatis=lacinia&non=eget&sodales=tincidunt&sed=eget&tincidunt=tempus&eu=vel&felis=pede&fusce=morbi&posuere=porttitor&felis=lorem&sed=id&lacus=ligula&morbi=suspendisse&sem=ornare&mauris=consequat&laoreet=lectus&ut=in",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Ráo",
                "type": "artist",
                "uri": "https://nyu.edu/integer/tincidunt/ante.html?nibh=potenti&in=nullam&hac=porttitor&habitasse=lacus&platea=at&dictumst=turpis&aliquam=donec&augue=posuere&quam=metus&sollicitudin=vitae&vitae=ipsum&consectetuer=aliquam&eget=non&rutrum=mauris"
            }
        ],
        "available_markets": "SV"
    }, {
        "album_type": "Mrs",
        "artists": [
            {
                "external_urls": {
                    "spotify": "https://spiegel.de/tincidunt/eget/tempus/vel/pede/morbi.json?consequat=morbi&lectus=vel&in=lectus&est=in&risus=quam&auctor=fringilla&sed=rhoncus&tristique=mauris&in=enim&tempus=leo&sit=rhoncus&amet=sed&sem=vestibulum&fusce=sit&consequat=amet&nulla=cursus&nisl=id&nunc=turpis&nisl=integer&duis=aliquet&bibendum=massa&felis=id&sed=lobortis&interdum=convallis&venenatis=tortor&turpis=risus&enim=dapibus&blandit=augue&mi=vel&in=accumsan&porttitor=tellus&pede=nisi&justo=eu&eu=orci&massa=mauris&donec=lacinia&dapibus=sapien&duis=quis&at=libero&velit=nullam&eu=sit&est=amet&congue=turpis&elementum=elementum&in=ligula&hac=vehicula&habitasse=consequat&platea=morbi&dictumst=a&morbi=ipsum&vestibulum=integer&velit=a&id=nibh&pretium=in&iaculis=quis&diam=justo&erat=maecenas&fermentum=rhoncus&justo=aliquam&nec=lacus&condimentum=morbi&neque=quis&sapien=tortor&placerat=id&ante=nulla&nulla=ultrices&justo=aliquet&aliquam=maecenas&quis=leo&turpis=odio&eget=condimentum&elit=id&sodales=luctus&scelerisque=nec&mauris=molestie&sit=sed&amet=justo&eros=pellentesque&suspendisse=viverra&accumsan=pede&tortor=ac&quis=diam"
                },
                "href": "http://feedburner.com/in/sapien/iaculis/congue.js?praesent=condimentum&lectus=curabitur&vestibulum=in&quam=libero&sapien=ut&varius=massa&ut=volutpat&blandit=convallis&non=morbi&interdum=odio&in=odio&ante=elementum&vestibulum=eu&ante=interdum&ipsum=eu&primis=tincidunt&in=in&faucibus=leo&orci=maecenas&luctus=pulvinar&et=lobortis&ultrices=est&posuere=phasellus&cubilia=sit&curae=amet&duis=erat&faucibus=nulla&accumsan=tempus&odio=vivamus&curabitur=in&convallis=felis&duis=eu&consequat=sapien&dui=cursus&nec=vestibulum&nisi=proin&volutpat=eu&eleifend=mi&donec=nulla&ut=ac&dolor=enim&morbi=in&vel=tempor&lectus=turpis&in=nec&quam=euismod&fringilla=scelerisque&rhoncus=quam&mauris=turpis&enim=adipiscing&leo=lorem&rhoncus=vitae&sed=mattis&vestibulum=nibh&sit=ligula&amet=nec&cursus=sem&id=duis&turpis=aliquam&integer=convallis&aliquet=nunc&massa=proin&id=at&lobortis=turpis&convallis=a&tortor=pede&risus=posuere&dapibus=nonummy&augue=integer&vel=non&accumsan=velit&tellus=donec&nisi=diam&eu=neque&orci=vestibulum&mauris=eget&lacinia=vulputate&sapien=ut&quis=ultrices&libero=vel&nullam=augue",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Irène",
                "type": "artist",
                "uri": "https://tiny.cc/congue/etiam.jpg?luctus=at&ultricies=velit&eu=eu&nibh=est&quisque=congue&id=elementum&justo=in&sit=hac&amet=habitasse&sapien=platea&dignissim=dictumst&vestibulum=morbi&vestibulum=vestibulum&ante=velit&ipsum=id&primis=pretium&in=iaculis&faucibus=diam&orci=erat&luctus=fermentum&et=justo&ultrices=nec&posuere=condimentum&cubilia=neque&curae=sapien&nulla=placerat&dapibus=ante&dolor=nulla&vel=justo&est=aliquam&donec=quis&odio=turpis&justo=eget&sollicitudin=elit&ut=sodales&suscipit=scelerisque&a=mauris&feugiat=sit&et=amet&eros=eros&vestibulum=suspendisse&ac=accumsan&est=tortor&lacinia=quis&nisi=turpis&venenatis=sed&tristique=ante&fusce=vivamus&congue=tortor&diam=duis"
            }
        ],
        "available_markets": "BT"
    }, {
        "album_type": "Honorable",
        "artists": [
            {
                "external_urls": {
                    "spotify": "http://facebook.com/semper/porta/volutpat/quam.jsp?vestibulum=eu&sed=est&magna=congue&at=elementum&nunc=in&commodo=hac&placerat=habitasse&praesent=platea&blandit=dictumst&nam=morbi&nulla=vestibulum&integer=velit&pede=id&justo=pretium&lacinia=iaculis&eget=diam&tincidunt=erat&eget=fermentum&tempus=justo&vel=nec&pede=condimentum&morbi=neque&porttitor=sapien&lorem=placerat&id=ante&ligula=nulla&suspendisse=justo&ornare=aliquam&consequat=quis&lectus=turpis&in=eget&est=elit&risus=sodales&auctor=scelerisque&sed=mauris&tristique=sit&in=amet&tempus=eros&sit=suspendisse&amet=accumsan&sem=tortor&fusce=quis&consequat=turpis&nulla=sed&nisl=ante&nunc=vivamus&nisl=tortor&duis=duis&bibendum=mattis&felis=egestas"
                },
                "href": "http://wiley.com/blandit/lacinia/erat.jpg?sollicitudin=leo&vitae=odio&consectetuer=condimentum&eget=id&rutrum=luctus&at=nec&lorem=molestie&integer=sed&tincidunt=justo&ante=pellentesque&vel=viverra&ipsum=pede&praesent=ac&blandit=diam&lacinia=cras&erat=pellentesque&vestibulum=volutpat&sed=dui&magna=maecenas&at=tristique&nunc=est&commodo=et&placerat=tempus&praesent=semper",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Séverine",
                "type": "artist",
                "uri": "https://technorati.com/morbi/ut/odio/cras/mi.xml?eu=sit&massa=amet&donec=lobortis&dapibus=sapien&duis=sapien&at=non&velit=mi&eu=integer&est=ac&congue=neque&elementum=duis&in=bibendum&hac=morbi&habitasse=non&platea=quam&dictumst=nec&morbi=dui&vestibulum=luctus&velit=rutrum&id=nulla&pretium=tellus&iaculis=in&diam=sagittis&erat=dui&fermentum=vel&justo=nisl&nec=duis&condimentum=ac&neque=nibh&sapien=fusce&placerat=lacus&ante=purus&nulla=aliquet&justo=at&aliquam=feugiat&quis=non&turpis=pretium&eget=quis&elit=lectus&sodales=suspendisse&scelerisque=potenti&mauris=in&sit=eleifend&amet=quam&eros=a&suspendisse=odio&accumsan=in&tortor=hac&quis=habitasse&turpis=platea&sed=dictumst&ante=maecenas&vivamus=ut&tortor=massa&duis=quis&mattis=augue"
            }
        ],
        "available_markets": "AD"
    }, {
        "album_type": "Ms",
        "artists": [
            {
                "external_urls": {
                    "spotify": "https://parallels.com/nulla/tempus/vivamus/in/felis/eu/sapien.html?parturient=condimentum&montes=curabitur&nascetur=in&ridiculus=libero&mus=ut&vivamus=massa&vestibulum=volutpat&sagittis=convallis&sapien=morbi&cum=odio&sociis=odio&natoque=elementum&penatibus=eu&et=interdum&magnis=eu&dis=tincidunt&parturient=in&montes=leo&nascetur=maecenas&ridiculus=pulvinar&mus=lobortis&etiam=est&vel=phasellus&augue=sit&vestibulum=amet&rutrum=erat&rutrum=nulla&neque=tempus&aenean=vivamus&auctor=in&gravida=felis&sem=eu&praesent=sapien&id=cursus&massa=vestibulum&id=proin&nisl=eu&venenatis=mi&lacinia=nulla&aenean=ac&sit=enim&amet=in&justo=tempor&morbi=turpis&ut=nec&odio=euismod&cras=scelerisque&mi=quam&pede=turpis&malesuada=adipiscing&in=lorem&imperdiet=vitae&et=mattis&commodo=nibh&vulputate=ligula&justo=nec&in=sem&blandit=duis&ultrices=aliquam&enim=convallis&lorem=nunc&ipsum=proin&dolor=at&sit=turpis&amet=a&consectetuer=pede&adipiscing=posuere&elit=nonummy&proin=integer&interdum=non&mauris=velit&non=donec&ligula=diam&pellentesque=neque&ultrices=vestibulum&phasellus=eget&id=vulputate&sapien=ut&in=ultrices&sapien=vel&iaculis=augue&congue=vestibulum&vivamus=ante&metus=ipsum&arcu=primis&adipiscing=in&molestie=faucibus&hendrerit=orci&at=luctus&vulputate=et&vitae=ultrices&nisl=posuere&aenean=cubilia&lectus=curae&pellentesque=donec&eget=pharetra"
                },
                "href": "http://domainmarket.com/nibh/in/quis/justo/maecenas.png?eu=non&sapien=mattis&cursus=pulvinar&vestibulum=nulla&proin=pede&eu=ullamcorper&mi=augue&nulla=a&ac=suscipit&enim=nulla&in=elit&tempor=ac&turpis=nulla&nec=sed&euismod=vel&scelerisque=enim&quam=sit&turpis=amet&adipiscing=nunc&lorem=viverra&vitae=dapibus&mattis=nulla&nibh=suscipit&ligula=ligula&nec=in&sem=lacus&duis=curabitur&aliquam=at&convallis=ipsum&nunc=ac&proin=tellus&at=semper&turpis=interdum&a=mauris&pede=ullamcorper",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Geneviève",
                "type": "artist",
                "uri": "http://cam.ac.uk/in/hac/habitasse/platea/dictumst.html?mauris=in&lacinia=leo&sapien=maecenas&quis=pulvinar&libero=lobortis&nullam=est&sit=phasellus&amet=sit&turpis=amet&elementum=erat&ligula=nulla&vehicula=tempus&consequat=vivamus&morbi=in&a=felis"
            }
        ],
        "available_markets": "SI"
    }, {
        "album_type": "Mrs",
        "artists": [
            {
                "external_urls": {
                    "spotify": "https://youtu.be/turpis.aspx?neque=id&sapien=luctus&placerat=nec&ante=molestie&nulla=sed&justo=justo&aliquam=pellentesque&quis=viverra&turpis=pede&eget=ac&elit=diam&sodales=cras&scelerisque=pellentesque&mauris=volutpat&sit=dui&amet=maecenas&eros=tristique&suspendisse=est&accumsan=et"
                },
                "href": "http://clickbank.net/amet/consectetuer.html?leo=feugiat&maecenas=et&pulvinar=eros&lobortis=vestibulum&est=ac&phasellus=est&sit=lacinia&amet=nisi&erat=venenatis&nulla=tristique&tempus=fusce&vivamus=congue&in=diam&felis=id&eu=ornare&sapien=imperdiet&cursus=sapien&vestibulum=urna&proin=pretium&eu=nisl&mi=ut&nulla=volutpat&ac=sapien&enim=arcu&in=sed&tempor=augue&turpis=aliquam&nec=erat&euismod=volutpat&scelerisque=in&quam=congue&turpis=etiam&adipiscing=justo&lorem=etiam&vitae=pretium&mattis=iaculis&nibh=justo&ligula=in&nec=hac&sem=habitasse&duis=platea&aliquam=dictumst&convallis=etiam&nunc=faucibus&proin=cursus&at=urna&turpis=ut&a=tellus&pede=nulla&posuere=ut",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Adélie",
                "type": "artist",
                "uri": "http://de.vu/parturient.xml?consequat=pharetra&nulla=magna&nisl=ac&nunc=consequat&nisl=metus&duis=sapien&bibendum=ut&felis=nunc&sed=vestibulum&interdum=ante&venenatis=ipsum&turpis=primis&enim=in&blandit=faucibus&mi=orci&in=luctus&porttitor=et&pede=ultrices&justo=posuere&eu=cubilia&massa=curae&donec=mauris&dapibus=viverra&duis=diam&at=vitae&velit=quam&eu=suspendisse&est=potenti&congue=nullam&elementum=porttitor&in=lacus&hac=at&habitasse=turpis&platea=donec"
            }
        ],
        "available_markets": "UA"
    }, {
        "album_type": "Mr",
        "artists": [
            {
                "external_urls": {
                    "spotify": "http://rediff.com/non.jsp?sollicitudin=libero&vitae=quis&consectetuer=orci&eget=nullam&rutrum=molestie&at=nibh&lorem=in&integer=lectus&tincidunt=pellentesque&ante=at&vel=nulla&ipsum=suspendisse&praesent=potenti&blandit=cras&lacinia=in&erat=purus&vestibulum=eu&sed=magna&magna=vulputate&at=luctus&nunc=cum&commodo=sociis&placerat=natoque&praesent=penatibus&blandit=et&nam=magnis&nulla=dis&integer=parturient&pede=montes&justo=nascetur&lacinia=ridiculus&eget=mus&tincidunt=vivamus&eget=vestibulum&tempus=sagittis&vel=sapien&pede=cum&morbi=sociis&porttitor=natoque&lorem=penatibus&id=et&ligula=magnis&suspendisse=dis&ornare=parturient&consequat=montes&lectus=nascetur&in=ridiculus&est=mus&risus=etiam&auctor=vel&sed=augue&tristique=vestibulum&in=rutrum&tempus=rutrum&sit=neque&amet=aenean&sem=auctor&fusce=gravida&consequat=sem&nulla=praesent&nisl=id&nunc=massa&nisl=id&duis=nisl&bibendum=venenatis&felis=lacinia&sed=aenean&interdum=sit&venenatis=amet&turpis=justo&enim=morbi&blandit=ut&mi=odio&in=cras&porttitor=mi&pede=pede&justo=malesuada&eu=in&massa=imperdiet&donec=et&dapibus=commodo"
                },
                "href": "http://netlog.com/nulla/dapibus/dolor/vel/est/donec.json?eleifend=lorem&luctus=integer&ultricies=tincidunt&eu=ante&nibh=vel&quisque=ipsum&id=praesent&justo=blandit&sit=lacinia&amet=erat&sapien=vestibulum&dignissim=sed&vestibulum=magna&vestibulum=at&ante=nunc&ipsum=commodo&primis=placerat&in=praesent&faucibus=blandit&orci=nam&luctus=nulla&et=integer&ultrices=pede&posuere=justo&cubilia=lacinia&curae=eget",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Inès",
                "type": "artist",
                "uri": "https://bluehost.com/magna.js?sed=vulputate&augue=vitae&aliquam=nisl&erat=aenean&volutpat=lectus&in=pellentesque&congue=eget&etiam=nunc&justo=donec&etiam=quis&pretium=orci&iaculis=eget&justo=orci&in=vehicula&hac=condimentum&habitasse=curabitur&platea=in&dictumst=libero&etiam=ut&faucibus=massa&cursus=volutpat&urna=convallis&ut=morbi&tellus=odio&nulla=odio&ut=elementum&erat=eu&id=interdum&mauris=eu&vulputate=tincidunt&elementum=in&nullam=leo&varius=maecenas&nulla=pulvinar&facilisi=lobortis&cras=est&non=phasellus&velit=sit&nec=amet&nisi=erat&vulputate=nulla&nonummy=tempus&maecenas=vivamus&tincidunt=in&lacus=felis&at=eu&velit=sapien&vivamus=cursus&vel=vestibulum&nulla=proin&eget=eu&eros=mi&elementum=nulla&pellentesque=ac&quisque=enim&porta=in&volutpat=tempor&erat=turpis&quisque=nec&erat=euismod&eros=scelerisque&viverra=quam&eget=turpis&congue=adipiscing&eget=lorem&semper=vitae&rutrum=mattis&nulla=nibh&nunc=ligula&purus=nec&phasellus=sem&in=duis&felis=aliquam&donec=convallis"
            }
        ],
        "available_markets": "KZ"
    }, {
        "album_type": "Dr",
        "artists": [
            {
                "external_urls": {
                    "spotify": "https://nba.com/consequat/varius/integer/ac/leo.html?egestas=habitasse&metus=platea&aenean=dictumst&fermentum=morbi&donec=vestibulum&ut=velit&mauris=id&eget=pretium&massa=iaculis&tempor=diam&convallis=erat&nulla=fermentum&neque=justo&libero=nec&convallis=condimentum&eget=neque&eleifend=sapien&luctus=placerat&ultricies=ante&eu=nulla&nibh=justo&quisque=aliquam&id=quis&justo=turpis&sit=eget&amet=elit&sapien=sodales&dignissim=scelerisque&vestibulum=mauris&vestibulum=sit&ante=amet&ipsum=eros&primis=suspendisse&in=accumsan&faucibus=tortor&orci=quis&luctus=turpis&et=sed&ultrices=ante&posuere=vivamus&cubilia=tortor&curae=duis&nulla=mattis&dapibus=egestas&dolor=metus&vel=aenean&est=fermentum&donec=donec&odio=ut&justo=mauris&sollicitudin=eget&ut=massa&suscipit=tempor&a=convallis&feugiat=nulla&et=neque&eros=libero&vestibulum=convallis&ac=eget&est=eleifend&lacinia=luctus&nisi=ultricies&venenatis=eu&tristique=nibh&fusce=quisque&congue=id&diam=justo&id=sit&ornare=amet&imperdiet=sapien&sapien=dignissim&urna=vestibulum&pretium=vestibulum&nisl=ante&ut=ipsum&volutpat=primis&sapien=in&arcu=faucibus"
                },
                "href": "http://msu.edu/sit/amet/sapien/dignissim.json?turpis=pede&donec=justo&posuere=eu&metus=massa&vitae=donec&ipsum=dapibus&aliquam=duis&non=at&mauris=velit&morbi=eu&non=est&lectus=congue&aliquam=elementum&sit=in&amet=hac&diam=habitasse&in=platea&magna=dictumst&bibendum=morbi&imperdiet=vestibulum&nullam=velit&orci=id&pede=pretium&venenatis=iaculis&non=diam&sodales=erat&sed=fermentum&tincidunt=justo&eu=nec&felis=condimentum&fusce=neque&posuere=sapien&felis=placerat&sed=ante&lacus=nulla&morbi=justo&sem=aliquam&mauris=quis&laoreet=turpis&ut=eget&rhoncus=elit&aliquet=sodales&pulvinar=scelerisque&sed=mauris&nisl=sit&nunc=amet&rhoncus=eros",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Yú",
                "type": "artist",
                "uri": "https://cdc.gov/interdum/mauris/ullamcorper/purus.jpg?pede=mi"
            }
        ],
        "available_markets": "TW"
    }, {
        "album_type": "Mrs",
        "artists": [
            {
                "external_urls": {
                    "spotify": "http://icio.us/sem/fusce/consequat.xml?nullam=faucibus&varius=orci&nulla=luctus&facilisi=et&cras=ultrices&non=posuere&velit=cubilia&nec=curae&nisi=duis&vulputate=faucibus&nonummy=accumsan&maecenas=odio&tincidunt=curabitur&lacus=convallis&at=duis&velit=consequat&vivamus=dui&vel=nec&nulla=nisi&eget=volutpat&eros=eleifend&elementum=donec&pellentesque=ut&quisque=dolor&porta=morbi&volutpat=vel&erat=lectus&quisque=in&erat=quam&eros=fringilla&viverra=rhoncus&eget=mauris&congue=enim&eget=leo&semper=rhoncus&rutrum=sed&nulla=vestibulum&nunc=sit&purus=amet&phasellus=cursus&in=id&felis=turpis&donec=integer&semper=aliquet&sapien=massa&a=id&libero=lobortis&nam=convallis&dui=tortor&proin=risus&leo=dapibus&odio=augue&porttitor=vel&id=accumsan&consequat=tellus&in=nisi&consequat=eu&ut=orci&nulla=mauris&sed=lacinia&accumsan=sapien&felis=quis&ut=libero&at=nullam&dolor=sit&quis=amet&odio=turpis&consequat=elementum&varius=ligula&integer=vehicula&ac=consequat"
                },
                "href": "http://amazon.de/vestibulum/quam/sapien/varius/ut/blandit/non.js?lorem=in&quisque=tempus&ut=sit&erat=amet&curabitur=sem&gravida=fusce&nisi=consequat&at=nulla&nibh=nisl&in=nunc&hac=nisl&habitasse=duis&platea=bibendum&dictumst=felis&aliquam=sed&augue=interdum&quam=venenatis&sollicitudin=turpis&vitae=enim&consectetuer=blandit&eget=mi&rutrum=in&at=porttitor&lorem=pede&integer=justo&tincidunt=eu&ante=massa&vel=donec&ipsum=dapibus&praesent=duis&blandit=at&lacinia=velit&erat=eu&vestibulum=est&sed=congue&magna=elementum&at=in&nunc=hac&commodo=habitasse&placerat=platea&praesent=dictumst&blandit=morbi&nam=vestibulum&nulla=velit&integer=id&pede=pretium&justo=iaculis&lacinia=diam&eget=erat&tincidunt=fermentum&eget=justo&tempus=nec&vel=condimentum&pede=neque&morbi=sapien&porttitor=placerat&lorem=ante&id=nulla&ligula=justo&suspendisse=aliquam&ornare=quis&consequat=turpis&lectus=eget&in=elit&est=sodales&risus=scelerisque&auctor=mauris&sed=sit&tristique=amet&in=eros&tempus=suspendisse&sit=accumsan&amet=tortor&sem=quis&fusce=turpis&consequat=sed&nulla=ante&nisl=vivamus&nunc=tortor&nisl=duis&duis=mattis&bibendum=egestas&felis=metus&sed=aenean&interdum=fermentum&venenatis=donec&turpis=ut&enim=mauris&blandit=eget&mi=massa&in=tempor&porttitor=convallis&pede=nulla&justo=neque&eu=libero&massa=convallis&donec=eget&dapibus=eleifend",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Mylène",
                "type": "artist",
                "uri": "https://dedecms.com/ante.jpg?massa=consectetuer&tempor=adipiscing&convallis=elit&nulla=proin&neque=risus&libero=praesent&convallis=lectus&eget=vestibulum&eleifend=quam&luctus=sapien&ultricies=varius&eu=ut&nibh=blandit&quisque=non&id=interdum&justo=in&sit=ante&amet=vestibulum&sapien=ante&dignissim=ipsum&vestibulum=primis&vestibulum=in&ante=faucibus&ipsum=orci&primis=luctus&in=et&faucibus=ultrices&orci=posuere&luctus=cubilia&et=curae&ultrices=duis&posuere=faucibus&cubilia=accumsan&curae=odio&nulla=curabitur&dapibus=convallis&dolor=duis&vel=consequat&est=dui&donec=nec&odio=nisi&justo=volutpat&sollicitudin=eleifend&ut=donec&suscipit=ut&a=dolor&feugiat=morbi&et=vel&eros=lectus&vestibulum=in&ac=quam&est=fringilla&lacinia=rhoncus&nisi=mauris&venenatis=enim&tristique=leo&fusce=rhoncus&congue=sed"
            }
        ],
        "available_markets": "QA"
    }, {
        "album_type": "Mr",
        "artists": [
            {
                "external_urls": {
                    "spotify": "https://reference.com/mattis.aspx?congue=nibh&elementum=in&in=hac&hac=habitasse&habitasse=platea&platea=dictumst&dictumst=aliquam&morbi=augue&vestibulum=quam&velit=sollicitudin&id=vitae&pretium=consectetuer&iaculis=eget&diam=rutrum&erat=at&fermentum=lorem&justo=integer&nec=tincidunt&condimentum=ante&neque=vel&sapien=ipsum&placerat=praesent&ante=blandit&nulla=lacinia&justo=erat&aliquam=vestibulum&quis=sed&turpis=magna&eget=at&elit=nunc&sodales=commodo&scelerisque=placerat&mauris=praesent&sit=blandit&amet=nam&eros=nulla&suspendisse=integer&accumsan=pede&tortor=justo&quis=lacinia&turpis=eget&sed=tincidunt&ante=eget&vivamus=tempus&tortor=vel&duis=pede&mattis=morbi&egestas=porttitor&metus=lorem&aenean=id&fermentum=ligula&donec=suspendisse&ut=ornare&mauris=consequat&eget=lectus&massa=in&tempor=est&convallis=risus&nulla=auctor&neque=sed&libero=tristique&convallis=in&eget=tempus&eleifend=sit&luctus=amet&ultricies=sem&eu=fusce&nibh=consequat&quisque=nulla&id=nisl&justo=nunc"
                },
                "href": "https://google.fr/sed/vel/enim.json?cubilia=habitasse&curae=platea",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Andrée",
                "type": "artist",
                "uri": "http://npr.org/potenti.aspx?curae=posuere&duis=felis&faucibus=sed&accumsan=lacus&odio=morbi&curabitur=sem&convallis=mauris&duis=laoreet&consequat=ut&dui=rhoncus&nec=aliquet&nisi=pulvinar&volutpat=sed&eleifend=nisl&donec=nunc&ut=rhoncus&dolor=dui&morbi=vel&vel=sem&lectus=sed&in=sagittis&quam=nam&fringilla=congue&rhoncus=risus&mauris=semper"
            }
        ],
        "available_markets": "IL"
    }, {
        "album_type": "Mr",
        "artists": [
            {
                "external_urls": {
                    "spotify": "https://miibeian.gov.cn/pellentesque/viverra/pede/ac.html?mauris=sapien&lacinia=sapien&sapien=non&quis=mi&libero=integer&nullam=ac&sit=neque&amet=duis&turpis=bibendum&elementum=morbi&ligula=non&vehicula=quam&consequat=nec&morbi=dui&a=luctus&ipsum=rutrum&integer=nulla&a=tellus&nibh=in&in=sagittis&quis=dui&justo=vel&maecenas=nisl&rhoncus=duis&aliquam=ac&lacus=nibh&morbi=fusce&quis=lacus&tortor=purus&id=aliquet&nulla=at&ultrices=feugiat&aliquet=non&maecenas=pretium&leo=quis&odio=lectus&condimentum=suspendisse&id=potenti&luctus=in&nec=eleifend&molestie=quam&sed=a&justo=odio&pellentesque=in&viverra=hac&pede=habitasse&ac=platea&diam=dictumst&cras=maecenas&pellentesque=ut&volutpat=massa&dui=quis&maecenas=augue&tristique=luctus&est=tincidunt&et=nulla&tempus=mollis&semper=molestie&est=lorem&quam=quisque&pharetra=ut&magna=erat&ac=curabitur&consequat=gravida&metus=nisi&sapien=at&ut=nibh&nunc=in&vestibulum=hac&ante=habitasse&ipsum=platea&primis=dictumst&in=aliquam&faucibus=augue&orci=quam&luctus=sollicitudin&et=vitae&ultrices=consectetuer&posuere=eget&cubilia=rutrum&curae=at&mauris=lorem&viverra=integer"
                },
                "href": "https://w3.org/porta/volutpat/quam/pede.jpg?posuere=ut&felis=blandit&sed=non&lacus=interdum&morbi=in&sem=ante&mauris=vestibulum&laoreet=ante&ut=ipsum&rhoncus=primis&aliquet=in&pulvinar=faucibus&sed=orci&nisl=luctus&nunc=et&rhoncus=ultrices&dui=posuere&vel=cubilia&sem=curae&sed=duis&sagittis=faucibus&nam=accumsan&congue=odio&risus=curabitur&semper=convallis&porta=duis&volutpat=consequat&quam=dui&pede=nec&lobortis=nisi&ligula=volutpat&sit=eleifend&amet=donec&eleifend=ut&pede=dolor&libero=morbi&quis=vel&orci=lectus&nullam=in&molestie=quam&nibh=fringilla&in=rhoncus&lectus=mauris&pellentesque=enim&at=leo&nulla=rhoncus&suspendisse=sed&potenti=vestibulum&cras=sit&in=amet&purus=cursus&eu=id&magna=turpis&vulputate=integer&luctus=aliquet&cum=massa&sociis=id&natoque=lobortis&penatibus=convallis&et=tortor&magnis=risus&dis=dapibus&parturient=augue&montes=vel&nascetur=accumsan&ridiculus=tellus&mus=nisi&vivamus=eu&vestibulum=orci&sagittis=mauris&sapien=lacinia&cum=sapien&sociis=quis&natoque=libero&penatibus=nullam&et=sit&magnis=amet&dis=turpis&parturient=elementum&montes=ligula&nascetur=vehicula&ridiculus=consequat&mus=morbi&etiam=a&vel=ipsum&augue=integer&vestibulum=a&rutrum=nibh&rutrum=in&neque=quis",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Mà",
                "type": "artist",
                "uri": "http://ox.ac.uk/consequat/in/consequat.xml?tortor=lacus&quis=at&turpis=turpis&sed=donec&ante=posuere&vivamus=metus&tortor=vitae&duis=ipsum&mattis=aliquam&egestas=non&metus=mauris&aenean=morbi&fermentum=non&donec=lectus&ut=aliquam&mauris=sit&eget=amet&massa=diam&tempor=in&convallis=magna&nulla=bibendum&neque=imperdiet&libero=nullam&convallis=orci&eget=pede&eleifend=venenatis&luctus=non&ultricies=sodales&eu=sed&nibh=tincidunt&quisque=eu&id=felis&justo=fusce&sit=posuere&amet=felis&sapien=sed&dignissim=lacus&vestibulum=morbi&vestibulum=sem&ante=mauris&ipsum=laoreet&primis=ut&in=rhoncus&faucibus=aliquet&orci=pulvinar&luctus=sed&et=nisl&ultrices=nunc&posuere=rhoncus&cubilia=dui&curae=vel&nulla=sem&dapibus=sed&dolor=sagittis&vel=nam&est=congue&donec=risus"
            }
        ],
        "available_markets": "DE"
    }, {
        "album_type": "Mrs",
        "artists": [
            {
                "external_urls": {
                    "spotify": "http://paginegialle.it/vestibulum/ante/ipsum.js?erat=faucibus&curabitur=cursus&gravida=urna&nisi=ut&at=tellus&nibh=nulla&in=ut&hac=erat&habitasse=id&platea=mauris&dictumst=vulputate&aliquam=elementum&augue=nullam&quam=varius&sollicitudin=nulla&vitae=facilisi&consectetuer=cras&eget=non&rutrum=velit&at=nec&lorem=nisi&integer=vulputate&tincidunt=nonummy&ante=maecenas&vel=tincidunt&ipsum=lacus&praesent=at&blandit=velit&lacinia=vivamus&erat=vel&vestibulum=nulla"
                },
                "href": "http://dyndns.org/id/consequat/in/consequat/ut/nulla/sed.jpg?sed=sagittis&interdum=nam&venenatis=congue&turpis=risus&enim=semper&blandit=porta&mi=volutpat&in=quam&porttitor=pede&pede=lobortis&justo=ligula&eu=sit&massa=amet&donec=eleifend&dapibus=pede&duis=libero&at=quis&velit=orci&eu=nullam&est=molestie&congue=nibh&elementum=in&in=lectus&hac=pellentesque&habitasse=at&platea=nulla&dictumst=suspendisse&morbi=potenti&vestibulum=cras&velit=in&id=purus&pretium=eu&iaculis=magna&diam=vulputate&erat=luctus&fermentum=cum&justo=sociis&nec=natoque&condimentum=penatibus&neque=et&sapien=magnis&placerat=dis&ante=parturient&nulla=montes&justo=nascetur&aliquam=ridiculus&quis=mus&turpis=vivamus&eget=vestibulum&elit=sagittis&sodales=sapien&scelerisque=cum&mauris=sociis&sit=natoque&amet=penatibus&eros=et&suspendisse=magnis",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Gaïa",
                "type": "artist",
                "uri": "http://paginegialle.it/justo/eu.xml?id=nulla&sapien=suspendisse&in=potenti&sapien=cras&iaculis=in&congue=purus&vivamus=eu&metus=magna&arcu=vulputate&adipiscing=luctus&molestie=cum&hendrerit=sociis&at=natoque&vulputate=penatibus&vitae=et"
            }
        ],
        "available_markets": "LT"
    }, {
        "album_type": "Ms",
        "artists": [
            {
                "external_urls": {
                    "spotify": "https://webnode.com/orci/luctus/et/ultrices/posuere/cubilia.json?in=in&sagittis=faucibus&dui=orci&vel=luctus&nisl=et&duis=ultrices&ac=posuere&nibh=cubilia&fusce=curae&lacus=donec&purus=pharetra&aliquet=magna&at=vestibulum&feugiat=aliquet&non=ultrices&pretium=erat&quis=tortor&lectus=sollicitudin&suspendisse=mi&potenti=sit&in=amet&eleifend=lobortis&quam=sapien&a=sapien&odio=non&in=mi&hac=integer&habitasse=ac&platea=neque&dictumst=duis&maecenas=bibendum&ut=morbi&massa=non&quis=quam&augue=nec&luctus=dui&tincidunt=luctus&nulla=rutrum&mollis=nulla&molestie=tellus&lorem=in&quisque=sagittis&ut=dui&erat=vel&curabitur=nisl&gravida=duis&nisi=ac&at=nibh&nibh=fusce&in=lacus&hac=purus&habitasse=aliquet&platea=at&dictumst=feugiat&aliquam=non&augue=pretium&quam=quis&sollicitudin=lectus&vitae=suspendisse&consectetuer=potenti&eget=in&rutrum=eleifend&at=quam&lorem=a&integer=odio&tincidunt=in"
                },
                "href": "https://youku.com/eleifend/luctus/ultricies/eu/nibh/quisque.js?aliquet=curabitur&at=convallis&feugiat=duis&non=consequat&pretium=dui&quis=nec&lectus=nisi&suspendisse=volutpat&potenti=eleifend&in=donec&eleifend=ut&quam=dolor&a=morbi&odio=vel&in=lectus&hac=in&habitasse=quam&platea=fringilla&dictumst=rhoncus&maecenas=mauris&ut=enim&massa=leo&quis=rhoncus&augue=sed&luctus=vestibulum&tincidunt=sit&nulla=amet&mollis=cursus&molestie=id&lorem=turpis&quisque=integer&ut=aliquet&erat=massa&curabitur=id&gravida=lobortis&nisi=convallis",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Mélanie",
                "type": "artist",
                "uri": "https://wikispaces.com/donec/ut/mauris.xml?non=rhoncus&ligula=aliquet&pellentesque=pulvinar&ultrices=sed"
            }
        ],
        "available_markets": "UA"
    }, {
        "album_type": "Mrs",
        "artists": [
            {
                "external_urls": {
                    "spotify": "https://diigo.com/eros/viverra.xml?nisi=vel&vulputate=ipsum&nonummy=praesent&maecenas=blandit&tincidunt=lacinia&lacus=erat&at=vestibulum&velit=sed&vivamus=magna&vel=at&nulla=nunc&eget=commodo&eros=placerat&elementum=praesent&pellentesque=blandit&quisque=nam&porta=nulla&volutpat=integer&erat=pede&quisque=justo&erat=lacinia&eros=eget&viverra=tincidunt&eget=eget&congue=tempus&eget=vel&semper=pede&rutrum=morbi&nulla=porttitor&nunc=lorem&purus=id&phasellus=ligula&in=suspendisse&felis=ornare&donec=consequat&semper=lectus&sapien=in&a=est&libero=risus"
                },
                "href": "http://amazon.com/nonummy/maecenas.jsp?at=pulvinar&turpis=lobortis&a=est&pede=phasellus&posuere=sit&nonummy=amet&integer=erat&non=nulla&velit=tempus&donec=vivamus&diam=in&neque=felis&vestibulum=eu&eget=sapien&vulputate=cursus&ut=vestibulum&ultrices=proin&vel=eu&augue=mi&vestibulum=nulla&ante=ac&ipsum=enim&primis=in&in=tempor&faucibus=turpis&orci=nec&luctus=euismod&et=scelerisque&ultrices=quam&posuere=turpis&cubilia=adipiscing&curae=lorem&donec=vitae&pharetra=mattis&magna=nibh&vestibulum=ligula&aliquet=nec&ultrices=sem&erat=duis&tortor=aliquam&sollicitudin=convallis&mi=nunc&sit=proin&amet=at&lobortis=turpis&sapien=a&sapien=pede&non=posuere&mi=nonummy&integer=integer&ac=non&neque=velit&duis=donec&bibendum=diam&morbi=neque&non=vestibulum&quam=eget&nec=vulputate&dui=ut&luctus=ultrices&rutrum=vel&nulla=augue&tellus=vestibulum&in=ante&sagittis=ipsum&dui=primis&vel=in&nisl=faucibus&duis=orci&ac=luctus&nibh=et&fusce=ultrices&lacus=posuere&purus=cubilia&aliquet=curae&at=donec&feugiat=pharetra&non=magna&pretium=vestibulum&quis=aliquet&lectus=ultrices&suspendisse=erat&potenti=tortor&in=sollicitudin&eleifend=mi&quam=sit&a=amet&odio=lobortis&in=sapien&hac=sapien&habitasse=non&platea=mi&dictumst=integer&maecenas=ac&ut=neque&massa=duis&quis=bibendum&augue=morbi&luctus=non",
                "id": "0TnOYISbd1XYRBk9myaseg",
                "name": "Léonore",
                "type": "artist",
                "uri": "http://nytimes.com/justo.png?ligula=nulla&nec=nisl&sem=nunc&duis=nisl&aliquam=duis&convallis=bibendum&nunc=felis&proin=sed&at=interdum&turpis=venenatis&a=turpis&pede=enim&posuere=blandit&nonummy=mi&integer=in&non=porttitor&velit=pede&donec=justo&diam=eu&neque=massa&vestibulum=donec&eget=dapibus&vulputate=duis&ut=at&ultrices=velit&vel=eu&augue=est&vestibulum=congue&ante=elementum&ipsum=in&primis=hac&in=habitasse&faucibus=platea&orci=dictumst&luctus=morbi&et=vestibulum&ultrices=velit&posuere=id&cubilia=pretium&curae=iaculis&donec=diam&pharetra=erat&magna=fermentum&vestibulum=justo&aliquet=nec&ultrices=condimentum&erat=neque&tortor=sapien&sollicitudin=placerat&mi=ante&sit=nulla&amet=justo&lobortis=aliquam&sapien=quis&sapien=turpis&non=eget&mi=elit&integer=sodales&ac=scelerisque&neque=mauris&duis=sit&bibendum=amet&morbi=eros"
            }
        ],
        "available_markets": "HN"
    }];
*/
