import { Fragment, useState } from 'react'
import Header from './sections/header/header'
import Date from './sections/date/date'
import Dashboard from './sections/dashboard/dashboard'

import './styles/modern-normalize.css'
import './styles/App.css'
import './styles/utils.css'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <header>
        <div className='mobile_date_container'>
          <Header />
          <Date />
        </div>
        <Dashboard />
      </header>

      <main>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim eligendi culpa eveniet maxime quae temporibus odit sint quaerat ea dicta earum iste neque, numquam deserunt sapiente incidunt officiis consequuntur esse hic obcaecati maiores? Provident iure quo nulla minima suscipit magnam facilis earum nemo consequatur in rem iste illum sint quas quasi, asperiores saepe dignissimos deserunt unde veritatis optio nihil, id architecto aliquid. Facere, ut? Nesciunt eligendi, voluptas aut corrupti quis laudantium nobis, necessitatibus, amet pariatur quasi facilis! Nobis eveniet reiciendis reprehenderit ipsa nihil facere tenetur ad saepe temporibus repellendus magni officiis, cum repellat. Nobis magni numquam placeat veritatis, magnam impedit commodi? Optio ea laudantium quidem reiciendis amet cumque tempore quasi vitae autem fugiat perferendis, asperiores minus pariatur assumenda eius sapiente rem facilis temporibus maxime molestias, explicabo omnis earum. Sed doloremque tempore, possimus mollitia dolor quisquam nesciunt? Asperiores vel doloribus atque quae cum porro repudiandae. Voluptate itaque aspernatur repellendus ipsam blanditiis? Assumenda quam non ab, atque quisquam magni, officia corporis fugiat nobis voluptatibus laudantium eos consequuntur. Vel officia odit nostrum ea, repellendus sunt, magnam, ad quisquam ipsam aut incidunt reprehenderit quod minima molestiae assumenda aperiam? Praesentium libero, similique tenetur quasi dicta nostrum necessitatibus quam aliquid consequatur laborum dolores sed illum earum. Dolore dolores culpa a? Totam, cumque? Vero illum, sunt adipisci cum eaque minima tenetur voluptatem nesciunt dolorem porro, nobis numquam quod quas, repudiandae ducimus beatae dolorum in obcaecati sit exercitationem ullam. Minus, eveniet suscipit! Magnam error numquam sed asperiores fugiat nulla facere nam temporibus, aut reiciendis sequi hic in, molestiae ut. Voluptas, rerum corporis dicta ipsum exercitationem corrupti ipsam laborum. Earum at incidunt iusto beatae exercitationem assumenda a quod laboriosam voluptatum cupiditate ab vitae magni inventore quidem, molestias, alias nobis ad sapiente quia! Inventore aspernatur nam doloribus deserunt vel qui, incidunt rerum, sequi ipsa asperiores ducimus vero maiores sint aperiam labore suscipit eaque! Molestias et non officiis sapiente iure, harum aspernatur! Itaque quaerat doloremque, veniam voluptatem amet a, placeat blanditiis corporis magnam tempore eum consequatur odio iusto quibusdam odit pariatur tempora mollitia provident, ea aliquam velit illo perspiciatis praesentium! Eos totam exercitationem, earum doloribus aperiam laudantium! Ipsam quas voluptates vel sequi, rerum quo aliquam culpa a consequuntur pariatur quis sed. Molestiae totam maxime dolorem dolor tempora similique veniam. Eius doloribus perspiciatis numquam recusandae, molestias perferendis odio ipsa minus a vero. Neque sequi dolores nisi exercitationem accusantium ipsum adipisci voluptas corrupti eius veritatis. Magni laboriosam repudiandae quo praesentium similique, est tempore facere sed voluptates. Eius similique, rem eos cum accusantium architecto repellat velit consequuntur eum ullam assumenda necessitatibus ipsam accusamus, nihil laudantium dolores inventore culpa, minima aliquid nisi mollitia esse obcaecati voluptatem. Minima in laborum expedita dolorum exercitationem nulla ratione ipsum, dolores dignissimos, quis modi doloribus. Id, dolorem molestias corrupti incidunt fugit alias quaerat! Illum nesciunt illo aut temporibus velit natus magnam, tenetur facere officiis? Omnis ex, cupiditate nostrum officia expedita, dicta nisi praesentium corrupti temporibus sed a quae corporis, sunt accusamus vitae rerum ut repellat quia atque. Dolore, sed. Voluptates vero quisquam cupiditate! Deserunt, asperiores molestiae aut sequi nemo sint!
      </main>
    </>
  )
}

export default App
