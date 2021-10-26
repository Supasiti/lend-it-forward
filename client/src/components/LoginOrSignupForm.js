import { Tab, Tabs, TabList, TabPanel, TabPanels } from '@chakra-ui/react';

import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { primaryBtnColorProps } from '../staticProps/button';

const tabProps = {
  p: { base: '3', sm: '5' },
};

const tabsProps = {
  maxW: '24rem',
  mx: 'auto',
  isFitted: true,
  variant: 'soft-rounded',
};

const tabPanelPropsMap = {
  card: {
    mt: '8',
    bg: 'gunmetal',
    borderRadius: '3xl',
    boxShadow: 'dark-lg',
  },
  none: { mt: '8' },
};
const tabPanelProps = (variant) => tabPanelPropsMap[variant];

// render

const LoginOrSignupForm = ({ onLogin, onSignup, variant = 'card' }) => {
  return (
    <Tabs {...tabsProps}>
      <TabList bg="sidecar" borderRadius="full">
        <Tab {...tabProps} {...primaryBtnColorProps}>
          Login
        </Tab>
        <Tab {...tabProps} {...primaryBtnColorProps}>
          Sign up
        </Tab>
      </TabList>

      <TabPanels {...tabPanelProps(variant)}>
        <TabPanel>
          <LoginForm onLogin={onLogin} />
        </TabPanel>
        <TabPanel>
          <SignupForm onSignup={onSignup} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default LoginOrSignupForm;
