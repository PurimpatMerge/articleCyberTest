import bg from '../../assets/bg-room.jpg'
import Avatar from '@mui/material/Avatar';
const Articlebody = () => {
    return (
        <div className="container mx-auto my-10 bg-white p-5">
            {/* Header */}
            <div className="my-5 text-center">
                <h1 className='font-bold text-3xl'>การประยุกต์ใช้องค์ความรู้ทางวัฒนธรรมประเพณีท้องถิ่น ในการอนุรักษ์ฟื้นฟูป่าชุมชนริมลำน้ำชี ของชุมชนบ้านมะระ ตำบลหนองเต็ง อำเภอกระสัง จังหวัดบุรีรัมย์</h1>
            </div>
            {/* Avatar */}
            <div className='flex'>
                <Avatar alt="avatar" src={bg} />
                <div className='my-auto gap-1 mx-1 flex'>
                    <p>ชื่อ นรามสกุล</p>
                    <p className='text-yellow-500'>11/02/2222</p>
                </div>
            </div>
            {/* Image */}
            <div className='flex justify-center'>
                <img src={bg} alt="articlebg" className='h-[600px] bg-cover' />
            </div>
            {/* content */}
            <div className='mt-10'>
                <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur nulla reprehenderit ad magni quaerat? Dolores incidunt illo dignissimos beatae similique nesciunt laboriosam natus architecto ratione sit adipisci impedit sed eaque quaerat, dolor nam vitae veniam totam animi corporis. Alias tempore iste amet consequuntur provident fugiat ut facere earum dolorum ex quia, beatae ad vitae doloremque minima totam corporis? Excepturi unde ipsam necessitatibus? Mollitia ab excepturi non hic, nam maxime neque libero, fuga rerum dignissimos consequuntur. In, consectetur et. Molestiae quis tempore nam, aperiam facilis voluptatum asperiores corporis, aspernatur fuga vero quae, eos itaque pariatur? Quibusdam accusamus rem sapiente quos hic.
                </p>
            </div>
        </div>

    )
}

export default Articlebody;