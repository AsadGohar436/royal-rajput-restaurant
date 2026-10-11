export interface SocialLink {
  name: string;
  url: string;
  handle: string;
  icon: string;
  color: string;
  bgColor: string;
  description: string;
}

export const SOCIAL_CONFIG = {
  email: 'asadgohar21@gmail.com',
  dpImage: '/images/royal_rajput_dp.svg',
  coverImage: '/images/royal_rajput_cover.svg',
  brandName: 'Royal Rajput',
  tagline: 'Imperial Pakistani Fine Dining & Charcoal BBQ',
  
  links: [
    {
      name: 'Instagram',
      url: 'https://instagram.com/royalrajput.pk',
      handle: '@royalrajput.pk',
      icon: 'instagram',
      color: 'text-pink-400 hover:text-pink-300',
      bgColor: 'bg-pink-500/10 hover:bg-pink-500/20 border-pink-500/30',
      description: 'Official Instagram: Sizzling Karahi Reels & Food Photography',
    },
    {
      name: 'Facebook',
      url: 'https://facebook.com/royalrajput.pk',
      handle: 'Royal Rajput Fine Dining',
      icon: 'facebook',
      color: 'text-blue-400 hover:text-blue-300',
      bgColor: 'bg-blue-500/10 hover:bg-blue-500/20 border-blue-500/30',
      description: 'Official Facebook: Dining Reviews, Menus & Special Offers',
    },
    {
      name: 'TikTok',
      url: 'https://tiktok.com/@royalrajput.pk',
      handle: '@royalrajput.pk',
      icon: 'tiktok',
      color: 'text-cyan-400 hover:text-cyan-300',
      bgColor: 'bg-cyan-500/10 hover:bg-cyan-500/20 border-cyan-500/30',
      description: 'Official TikTok: Viral Cooking Highlights & Customer Reactions',
    },
    {
      name: 'YouTube',
      url: 'https://youtube.com/@royalrajputpk',
      handle: 'Royal Rajput Kitchen',
      icon: 'youtube',
      color: 'text-red-400 hover:text-red-300',
      bgColor: 'bg-red-500/10 hover:bg-red-500/20 border-red-500/30',
      description: 'Official YouTube: Master Chefs Heritage Recipes & Kitchen Tours',
    },
    {
      name: 'Official Email',
      url: 'mailto:asadgohar21@gmail.com',
      handle: 'asadgohar21@gmail.com',
      icon: 'mail',
      color: 'text-amber-400 hover:text-amber-300',
      bgColor: 'bg-amber-500/10 hover:bg-amber-500/20 border-amber-500/30',
      description: 'Executive Management & Catering Inquiries',
    },
  ],
};
