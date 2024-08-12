import React from 'react';

const Footer: React.FC = () => {

  return (
    <>
      <footer className='border-t-2 border-[#d6d5d5] text-[#4a95c0] drop-shadow-md bg-[#e6e6e6]'>
        <div className='flex md:justify-evenly mx-auto py-2'>
            <img src='src/assets/MRC_RGB.png'  width='320'></img>
            <img src='src/assets/Glasgow_RGB.png'  width='320'></img>
            <div className=' font-extralight '>
                <table className='  text-3xl'>
                <th className='font-light text-left text-[#3c80a7]'>Address</th>
                    <tr>
                        <tr>
                        <td className='text-xl'>464 Bearsden Rd</td>
                        </tr>
                        <tr>
                        <td className='text-xl'>Glasgow</td>
                        </tr>
                        <tr>
                        <td className='text-xl'>G61 1QH</td>
                        </tr>
                    </tr>
                </table>
                </div>
            <div className=' font-extralight '>
                <table className=' text-3xl text-[#3c80a7]'>
                <th className='font-light text-left'>Contact</th>
                    <tr>
                        <tr>
                            <td className='text-xl '>Tel: +44 (0) 141 330 4017</td>
                        </tr>
                        <tr>
                            <td className='text-xl'>E-mail: cvr-webresource-support@lists.cent.gla.ac.uk</td>
                        </tr>
                    </tr>
                </table>
                </div>
          </div>
      </footer>
    </>
  );
};

export default Footer;

