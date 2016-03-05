<?php

namespace Behance;

class Behance
{
    const ENDPOINT_PROJECTS   = '/projects';
    const ENDPOINT_USERS      = '/users';
    const TIMEOUT_DEFAULT_SEC = 30;

    protected $_api_root      = 'https://www.behance.net/v2';
    protected $_client_id;

    public function __construct($client_id)
    {
        $this->_client_id = $client_id;
    }

    public function getUserProfile($id_or_username)
    {
        $endpoint = $this->_api_root . self::ENDPOINT_USERS . '/' . $id_or_username . '?api_key=' . $this->_client_id;

        return $this->_executeRequest( $endpoint );
    }

    public function getUserProjects($id_or_username)
    {
        $endpoint = $this->_api_root . self::ENDPOINT_USERS . '/' . $id_or_username . self::ENDPOINT_PROJECTS . '?api_key=' . $this->_client_id;

        return $this->_executeRequest( $endpoint );
    }

    protected function _executeRequest($url)
    {
        $user_agent = "Behance API/PHP (App {$this->_client_id})";

        $ch = curl_init();
        
        curl_setopt($ch, CURLOPT_HTTPHEADER, array( 'Accept: application/json', 'Content-Type: multipart/form-data', 'Expect:' ));
        curl_setopt($ch, CURLOPT_TIMEOUT, self::TIMEOUT_DEFAULT_SEC);
        curl_setopt($ch, CURLOPT_USERAGENT, $user_agent);
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_BINARYTRANSFER, 1);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
        curl_setopt($ch, CURLOPT_HTTPGET, 1);
        
        $response = curl_exec($ch);
        return $response;

        curl_close($ch);
    }
}